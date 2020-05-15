import { BuilderOutput, createBuilder, BuilderContext } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { Schema } from './schema';
import util from 'util';
import { exec } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';

export const execAsync = util.promisify(exec);

export default createBuilder<any>(
  async (builderConfig: Schema, context: BuilderContext): Promise<BuilderOutput> => {
    try {
      context.reportStatus(`Executing "${builderConfig.noBuild}"...`);
      // const child = childProcess.spawn(options.command, options.args, { stdio: 'pipe' });

      const configuration = 'production';

      const overrides = {
        // this is an example how to override the workspace set of options
        ...({ sourceMap: true })
      };

      const build = await context.scheduleTarget({
        target: 'build',
        project: context?.target?.project || '',
        configuration
      }, overrides as json.JsonObject);

      const result = await build.result;

      if (result.success) {
        const file = fs.readdirSync(builderConfig.outputPath).filter(f => f.includes('es2015'));
        const filesToRemove = file.filter(f => f.includes('polyfills') || f.includes('runtime'));
        let filesToShow = file.filter(f => !filesToRemove.includes(f) && f.endsWith('.js'));

        let mainFile = filesToShow[0];
        let promptAvailableBundles;

        if (filesToShow.length > 1) {
          promptAvailableBundles = await inquirer
            .prompt([
              {
                type: 'list',
                name: 'bundleName',
                message: 'Select the bundle to run the analyzer?',
                choices: filesToShow,
              },
            ])
            .catch(error => {
              context.logger.info(error);
            });

          mainFile = promptAvailableBundles.bundleName;
        }

        const explorerCommand = `npx source-map-explorer ${builderConfig.outputPath}/${mainFile}`;
        const { stdout, stderr } = await execAsync(explorerCommand);
        context.logger.info(stdout);
        context.logger.info(stderr);
      }

      context.reportStatus(`Done.`);
      return {
        success: true
      };
    }
    catch (e) {
      return {
        error: e.message,
        success: true
      };
    }
  });

