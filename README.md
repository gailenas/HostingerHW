# Hostinger Muffin store E2E tests

## Project stack details

Project uses: TypoeScript, Playwright, yopMail, dotEnv

## Project preparation

### Instalation

> [!IMPORTANT] > </br>You need to have Node.js installed on your machine

After downloading code from repository, you must install project dependencies with the following command:

```bash
npx playwright install
```

### Running tests

Running tests in headless mode:

```bash
npm test
```

Running tests in headed mode:

```bash
npm run test-headed
```

## Reports

Project includes default PlayWright reports. After test run it could be launched with the following command:

```bash
npm run report
```

### Pipelines

Simple pipeline example is configured with Github Actions.
You can access it in the project repository -> Actions tab

# Running pipeline:

1. "Muffin store automation tests"
2. Click - Run workflow
3. Selecting the Main branch
4. Click - Run workflow again

# Reports in pipeline:

1. Open completed pipeline run
2. Open step: "Upload Playwright report to artifactory"
3. Click Artifact download URL
