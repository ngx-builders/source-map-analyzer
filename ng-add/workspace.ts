import { virtualFs, workspaces } from '@angular-devkit/core';
import { noop, Rule, SchematicsException, Tree } from '@angular-devkit/schematics';

/* Below code reference is taken from Angular CLI project. 
  https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/workspace.ts

  These methods are not part of public APIs so we should not be referencing those methods.
  that's why added below method here.
*/

function createHost(tree: Tree): workspaces.WorkspaceHost {
    return {
        async readFile(path: string): Promise<string> {
            const data = tree.read(path);
            if (!data) {
                throw new SchematicsException('File not found.');
            }
            return virtualFs.fileBufferToString(data);
        },
        async writeFile(path: string, data: string): Promise<void> {
            return tree.overwrite(path, data);
        },
        async isDirectory(path: string): Promise<boolean> {
            return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
        },
        async isFile(path: string): Promise<boolean> {
            return tree.exists(path);
        },
    };
}

export async function getWorkspace(tree: Tree, path = '/') : Promise<workspaces.WorkspaceDefinition> {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace(path, host);
    return workspace;
}

export function updateWorkspace(
    updater: (workspace: workspaces.WorkspaceDefinition) => void | Rule | PromiseLike<void | Rule>,
  ): Rule;
  export function updateWorkspace(workspace: workspaces.WorkspaceDefinition): Rule;
  export function updateWorkspace(
    updaterOrWorkspace:
      | workspaces.WorkspaceDefinition
      | ((workspace: workspaces.WorkspaceDefinition) => void | Rule | PromiseLike<void | Rule>),
  ): Rule {
    return async (tree: Tree) => {
      const host = createHost(tree);
  
      if (typeof updaterOrWorkspace === 'function') {
        const { workspace } = await workspaces.readWorkspace('/', host);
  
        const result = await updaterOrWorkspace(workspace);
  
        await workspaces.writeWorkspace(workspace, host);
  
        return result || noop;
      } else {
        await workspaces.writeWorkspace(updaterOrWorkspace, host);
  
        return noop;
      }
    };
  }