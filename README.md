# Builder To Run Source Map Explorer

Want to run the source-map-explorer with Angular? 
This builder does it for you with zero configuration.


## Setting up this Builder

```
ng add @ngx-builders/analyze
```

NOTE: For this version you need to install source-map-explore globally using

```
npm i source-map-explore -g
```

We will remove this dependecny in future updates.

## That's it. Now, you are good to go

Now whenever you want to analyze your angular project just run a command `ng run [YOUR_PROJECT_NAME]:analyze` and it will run the source-map-explorer.


## 📦 Options <a name="options"></a>

#### --configuration <a name="configuration"></a>

#### --no-build <a name="no-build"></a>
- **optional**
- Default: `false` (string)
- Example:
  - `ng run [YOUR_PROJECT_NAME]:analyze --no-build` – Angular project is NOT built

Skip build process during analysis.
This can be used when you are sure that you haven't changed anything and want to analyze the bundle

MIT
