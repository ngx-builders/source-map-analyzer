import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getWorkspace, getWorkspacePath, ProjectType, WorkspaceProject } from 'schematics-utilities';
import { NgAddOptions } from './schema';


export function sourceMapBuilder(options: NgAddOptions): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        // get the workspace details
        const workspaceSchema = getWorkspace(tree);
        const workspacePath: string = getWorkspacePath(tree);

        // getting project name
        if (!options.project) {
            if (workspaceSchema && workspaceSchema.defaultProject) {
                options.project = workspaceSchema.defaultProject;
            } else {
                throw new SchematicsException(
                    'No Angular project selected and no default project in the workspace'
                );
            }
        }

        // Validating project name
        const project: WorkspaceProject<ProjectType.Application> = workspaceSchema.projects[options.project];
        if (!project) {
            throw new SchematicsException(
                'The specified Angular project is not defined in this workspace'
            );
        }

        // Checking if it is application
        if (project.projectType !== 'application') {
            throw new SchematicsException(
                `source-map-analyzer requires an Angular project type of "application" in angular.json`
            );
        }

        // Getting output path from Angular.json
        if (
            !project.architect ||
            !project.architect.build ||
            !project.architect.build.options ||
            !project.architect.build.options.outputPath
        ) {
            throw new SchematicsException(
                `Cannot read the output path(architect.build.options.outputPath) of the Angular project "${options.project}" in angular.json`
            );
        }

        // adding deploy statement for builder
        project.architect['analyze'] = {
            "builder": "@ngx-builders/analyze:analyze",
            "options": {
                "outputPath": project.architect.build.options.outputPath
            }
        }

        tree.overwrite(workspacePath, JSON.stringify(workspaceSchema, null, 2));
        return tree;
    };
}

export default function (options: NgAddOptions): Rule {
    return sourceMapBuilder(options)
}
