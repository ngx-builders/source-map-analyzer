import { Rule, SchematicContext, SchematicsException, Tree, chain } from '@angular-devkit/schematics';
import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from 'schematics-utilities';

function addPackageJsonDependencies(): Rule {
    return (host: Tree, context: SchematicContext) => {
        
        // always add the package under dev dependencies
        const dependencies: NodeDependency[] = [
            { type: NodeDependencyType.Dev, version: '~0.0.0', name: '@ngx-builders/analyze' },
            { type: NodeDependencyType.Dev, version: '~2.4.2', name: 'source-map-explorer' }
        ];
        
        dependencies.forEach(dependency => {
            addPackageJsonDependency(host, dependency);
            context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
        });

        return host;
    };
}

function getWorkspace(host: Tree): { path: string; workspace: experimental.workspace.WorkspaceSchema } {
    const possibleFiles = ['/angular.json', './angular.json'];
    const path = possibleFiles.find(path => host.exists(path));

    if (!path) {
        throw new SchematicsException(`Could not find angular.json`);
    }

    const configBuffer = host.read(path);
    if (!configBuffer) {
        throw new SchematicsException(`Could not find angular.json`);
    }

    const content = configBuffer.toString();
    let workspace: experimental.workspace.WorkspaceSchema;

    try {
        workspace = <any>parseJson(content, JsonParseMode.Loose) as experimental.workspace.WorkspaceSchema;
    } catch (e) {
        throw new SchematicsException(`Could not parse angular.json: ${e.message}`);
    }

    return { path, workspace };
}

interface NgAddOptions {
    project?: string;
    siteID: string;
    netlifyToken: string;
}

export function sourceMapBuilder(options: NgAddOptions): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        // get the workspace details
        const { path: workspacePath, workspace } = getWorkspace(tree);

        // getting project name
        if (!options.project) {
            if (workspace.defaultProject) {
                options.project = workspace.defaultProject;
            } else {
                throw new SchematicsException(
                    'No Angular project selected and no default project in the workspace'
                );
            }
        }

        // Validating project name
        const project = workspace.projects[options.project];
        if (!project) {
            throw new SchematicsException(
                'The specified Angular project is not defined in this workspace'
            );
        }

        // Checking if it is application
        if (project.projectType !== 'application') {
            throw new SchematicsException(
                `Deploy requires an Angular project type of "application" in angular.json`
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

        tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
        return tree;
    };
}

export default function (options: NgAddOptions): Rule {
    return chain([
        sourceMapBuilder(options),
        addPackageJsonDependencies()
    ]);
}
