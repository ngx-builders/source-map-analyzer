import { TargetDefinition } from '@angular-devkit/core/src/workspace';
import { chain, Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NgAddOptions } from './schema';
import { getWorkspace, updateWorkspace } from './workspace';


export function ngAdd(options: NgAddOptions): Rule {
    return async (host: Tree) => {
        const workspace = await getWorkspace(host);

        // Get project name 
        if (!options.project) {
            if (workspace.extensions.defaultProject) {
                options.project = workspace.extensions.defaultProject as string;
            } else {
                throw new SchematicsException(
                    'No Angular project selected and no default project in the workspace'
                );
            }
        }

        // Validating project name
        const project = workspace.projects.get(options.project);
        if (!project) {
            throw new SchematicsException(`The specified Angular project is not defined in this workspace`);
        }

        // Checking if it is application
        if (project.extensions['projectType'] !== 'application') {
            throw new SchematicsException(`source-map-analyzer requires an Angular project type of "application" in angular.json`);
        }
        
        const outputPath: string | undefined = project.targets.get('build')?.options?.outputPath as string;

        if (!outputPath) {
            const message: string = `Cannot read the output path(architect.build.options.outputPath) of the Angular project "${options.project}" in angular.json`;
            throw new SchematicsException(message);
        }

        var targetDefinition: TargetDefinition = {
            builder: "@ngx-builders/analyze:analyze",
            options: {
                outputPath: outputPath
            }
        }

        project.targets.add({ name: 'analyze', ...targetDefinition });

        return chain([updateWorkspace(workspace)]);
    };
}
