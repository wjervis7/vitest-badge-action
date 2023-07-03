# Vitest Badge Action

[![Validate Build][buildImg]][buildLnk] ![Lines][testLinesImg] ![Lines][testStatementsImg] ![Lines][testFunctionsImg] ![Lines][testBranchesImg]

This action will parse the json summary created by Vitest, and create a status badge based on the results, and optionally upload to a Gist.

## Usage

This action requres you to use Vitest to create a coverage report, with the `json-summary` reporter.

You can configure the reporter in `vitest.config.ts` file, like this

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test {
      coverage {
        reporter [json-summary]
      }
    }
});
```

You must execute `vitest --coverage`, in a step, prior to this action.

## Permissions

You must provide a PAT, with `write` permission, to your Gist, if you want to upload the badge.

## Inputs

| parameter | description | default | required |
| --- | --- | --- | --- |
| result-type | Type of result to make badge for. Can be 'lines', 'statements', 'functions', or 'branches'. | | true |
| vitest-config-path | Path to the vitest config file. | vitest.config.ts | true |
| summary-path | Path to the json summary file. | ./coverage/coverage-summary.json | true |
| badge-text | Text to display on badge. | Tests | true |
| badge-pass-color | An array (comma separated) with hex (without #) or named colors of the badge value background, when coverage is at or above the threshold. More than one creates gradient background. | 31c653 | true |
| badge-fail-color | An array (comma separated) with hex (without #) or named colors of the badge value background, when coverage is below the threshold. More than one creates gradient background. | 800000 | true |
| badge-neutral-color | An array (comma separated) with hex (without #) or named colors of the badge value background, when coverage results were not found. More than one creates gradient background. | 696969 | true |
| badge-path | Path to save the temporary badge to. | badge.svg | true |
| upload-badge | Indicate if badge should be uploaded to Gist. | true | false |
| gist-token | PAT for writing to gist. | |  false |
| gist-url | Url to Gist. | | false |

## Example Workflows

### Example 1

Runs step, and uploads the badge to Gist, if target branch is main.

```yaml
---
name: Example1

on:
  pull_request:
    branches:
      - main
      - dev

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Run Unit Tests
        run: npx vitest --coverage # or run npm script

      - name: Publish Results Badge
        uses: wjervis7/vitest-badge-action@v1
        if: success() || failure() # run whether steps succeed or not
        with:
          result-type: lines
          gist-token: ${{ secrets.GIST_TOKEN }} # if you want to upload badge to gist
          gist-url: https://gist.github.com/{org/user}/{gist_id}
          upload-badge: ${{ github.base_ref == 'refs/heads/main' }}
```

### Example 2

Runs step, and commits the badge to Git

```yaml
---
name: Example2

on:
  pull_request:
    branches:
      - main
      - dev

jobs:
  build:
    runs-on: ubuntu-latest

    permissions:
      contents: write # needed to commit the changes

    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Run Unit Tests
        run: npx vitest --coverage # or run npm script

      - name: Publish Results Badge
        uses: wjervis7/vitest-badge-action@v1
        if: success() || failure() # run whether steps succeed or not
        with:
          result-type: statements
          upload-badge: false          

      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          file_pattern: './badge.svg'  
```

[buildImg]:<https://github.com/wjervis7/vitest-badge-action/actions/workflows/validation.yaml/badge.svg>
[buildLnk]:<https://github.com/wjervis7/vitest-badge-action/actions/workflows/validation.yaml>
[testLinesImg]:<https://raw.githubusercontent.com/gist/wjervis7/b6e7abcadd55f08304a4249fe962f75c/raw/badge-lines.svg>
[testStatementsImg]:<https://raw.githubusercontent.com/gist/wjervis7/b6e7abcadd55f08304a4249fe962f75c/raw/badge-statements.svg>
[testFunctionsImg]:<https://raw.githubusercontent.com/gist/wjervis7/b6e7abcadd55f08304a4249fe962f75c/raw/badge-functions.svg>
[testBranchesImg]:<https://raw.githubusercontent.com/gist/wjervis7/b6e7abcadd55f08304a4249fe962f75c/raw/badge-branches.svg>
