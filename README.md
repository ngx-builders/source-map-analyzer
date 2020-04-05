# Builder To Run Source Map Explorer

Want to run the source-map-explorer with Angular? 
This builder does it for you with zero configuration.


## Setting up this Builder

```
ng add @ngx-builders/analyze
```

## That's it. Now, you are good to go

Now whenever you want to deploy your angular project just run a command `ng run [YOUR_PROJECT_NAME]:analyze` and it will run the source-map-explorer.


## 📦 Options <a name="options"></a>

#### --configuration <a name="configuration"></a>

#### --no-build <a name="no-build"></a>
- **optional**
- Default: `false` (string)
- Example:
  - `ng run [YOUR_PROJECT_NAME]:analyze` – Angular project is build in production mode before the deployment
  - `ng deploy [YOUR_PROJECT_NAME]:analyze --no-build` – Angular project is NOT build

Skip build process during deployment.
This can be used when you are sure that you haven't changed anything and want to deploy with the latest artifact.
This command causes the `--configuration` setting to have no effect.

MIT
