import { BuilderOutput, createBuilder, BuilderContext } from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import { Schema } from './schema';
import util from 'util';
import { exec } from 'child_process';

export const execAsync = util.promisify(exec);

export default createBuilder<any>(
  async (builderConfig: Schema, context: BuilderContext): Promise<BuilderOutput> => {
    try {
      context.reportStatus(`Starting Build`);
      // const child = childProcess.spawn(options.command, options.args, { stdio: 'pipe' });

      const configuration = 'production';

      const overrides = {
        // this is an example how to override the workspace set of options
        ...({ sourceMap: true, budgets: [] })
      };

      const build = await context.scheduleTarget({
        target: 'build',
        project: context?.target?.project || '',
        configuration
      }, overrides as json.JsonObject);

      const result = await build.result;

      if (result.success) {
        const mainFile = '*es2015.*.js';
        let explorerCommand = `npx source-map-explorer ${builderConfig.outputPath}/${mainFile}`;
        if (builderConfig.gzip) {
          explorerCommand = `${explorerCommand} --gzip`;
        }
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

