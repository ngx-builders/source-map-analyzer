![source-map-analyzer](https://socialify.git.ci/ngx-builders/source-map-analyzer/image?font=Raleway&forks=1&issues=1&language=1&owner=1&pattern=Charlie%20Brown&pulls=1&stargazers=1&theme=Dark)

[![npm version](https://badge.fury.io/js/%40ngx-builders%2Fanalyze.svg)](https://badge.fury.io/js/%40ngx-builders%2Fanalyze)
![Node.js CI](https://github.com/ngx-builders/source-map-analyzer/workflows/Node.js%20CI/badge.svg?branch=master)
[![npm downloads](https://img.shields.io/npm/dt/@ngx-builders/analyze?label=npm%20downloads)](https://www.npmjs.com/package/@ngx-builders/analyze)

# Builder To Run Source Map Explorer
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Want to run the source-map-explorer with Angular? 
This builder does it for you with zero configuration.


## Setting up this Builder

```
ng add @ngx-builders/analyze
OR
ng add @ngx-builders/analyze --project={projectName}
```

NOTE: This version uses npx to install source-map-explorer temporarily if it isn't installed already. If you don't have npx installed, please install it.


We will remove this dependecny in future updates.

## That's it. Now, you are good to go

Now whenever you want to analyze your angular project just run a command `ng run [YOUR_PROJECT_NAME]:analyze` and it will run the source-map-explorer.


## 📦 Options <a name="options"></a>


#### --gzip <a name="gzip"></a>
- **optional**
- Default: `false` (boolean)
- Example:
  - `ng run [YOUR_PROJECT_NAME]:analyze --gzip` – Give the stats of gzip bundle.


#### --diffLoading <a name="diffLoading"></a>
- **optional**
- Default: `false` (boolean)
- Example:
  - `ng run [YOUR_PROJECT_NAME]:analyze --diffLoading=true` – You can change to true if differential loading is enabled.

# License
[MIT](https://github.com/ngx-builders/source-map-analyzer/blob/master/LICENSE)


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://ankitsharmablogs.com/"><img src="https://avatars1.githubusercontent.com/u/33789321?v=4" width="100px;" alt=""/><br /><sub><b>Ankit</b></sub></a><br /><a href="https://github.com/ngx-builders/source-map-analyzer/commits?author=AnkitSharma-007" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/twittwer"><img src="https://avatars1.githubusercontent.com/u/8677948?v=4" width="100px;" alt=""/><br /><sub><b>Tobias Wittwer</b></sub></a><br /><a href="https://github.com/ngx-builders/source-map-analyzer/commits?author=twittwer" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/BhavikCpatel"><img src="https://avatars3.githubusercontent.com/u/8742935?v=4" width="100px;" alt=""/><br /><sub><b>Bhavik</b></sub></a><br /><a href="https://github.com/ngx-builders/source-map-analyzer/commits?author=BhavikCpatel" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
