import {
  BuilderOutput,
  createBuilder,
  BuilderContext,
} from "@angular-devkit/architect";
import { Schema } from "./schema";
import util from "util";
import { exec } from "child_process";

export const execAsync = util.promisify(exec);

export default createBuilder<any>(
  async (
    builderConfig: Schema,
    context: BuilderContext
  ): Promise<BuilderOutput> => {
    try {
      context.reportStatus(`Starting Report generation...🚀`);

      const mainFile = "*.js";
      let explorerCommand = `npx source-map-explorer ${builderConfig.outputPath}/${mainFile}`;
      if (builderConfig.gzip) {
        explorerCommand = `${explorerCommand} --gzip`;
      }
      if(builderConfig.reportPath) {
        const reportFormat = builderConfig.reportFormat || 'html';
        explorerCommand = `${explorerCommand} --${reportFormat} ${builderConfig.reportPath}/${context?.target?.project}.html`;
      }
      const { stdout, stderr } = await execAsync(explorerCommand);
      context.logger.info(stdout);
      context.logger.info(stderr);

      context.reportStatus(`Done.`);
      return {
        success: true,
      };
    } catch (e: any) {
      return {
        error: e.message,
        success: true,
      };
    }
  }
);
