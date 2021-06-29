# Publish NPM package

## Create NPM account and activate it

1. Open <https://www.npmjs.com/> by browser, then click right-top [Sign up] button.
2. Fill Username, Email address and Password, then agree EULA and Privacy Policy and click [Create an account] button.
3. Open "[npm] Welcome..." mail by mailer, then click [Verify email address] button on the mail body.
    - Without this verify step, npm publish will fail with 403 Forbidden error.
4. Reload <https://www.npmjs.com/>

## Local NPM configuration

1. Run `npm adduser`, then input username, password and email address.
2. Check whether `~/.npmrc` is created.
3. Check whether `npm whoami` returns NPM account name.

## Prepare NPM contents

1. Check install and lint

   ```bash
   npm install
   npm run lint
   ```

2. Prepare package on `./npm` folder

   ```bash
   npm run prepare-npm
   ```

## Publish NPM package

1. Check what contents are published by dry-run.

   ```bash
   npm publish ./npm --access=public --dry-run
   ```

2. Publish NPM package.

   ```bash
   npm publish ./npm --access=public
   ```
