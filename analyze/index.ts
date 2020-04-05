import { BuilderOutput, createBuilder, BuilderContext } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { Schema } from './schema';
import util from 'util';
import { exec } from 'child_process';
import fs from 'fs';
import { explore } from 'source-map-explorer';

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
        const file = fs.readdirSync(builderConfig.outputPath).filter(f => f.includes('main-es2015'));
        const mainFile = file.find(f => f.endsWith('.js'));
        console.log(mainFile);

        // const commandToPublish = `source-map-explorer ${builderConfig.outputPath}/${mainFile}`;

        // const { stdout, stderr } = await execAsync(commandToPublish);
        // context.logger.info(stdout);
        // context.logger.info(stderr);

        const result = await explore(`${builderConfig.outputPath}/${mainFile}`, { output: { format: 'html' } });
        console.log(result.output);
        console.log(result.bundles);
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

