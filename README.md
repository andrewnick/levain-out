## PI install

* Run
    - `sudo yarn dev`

* Postgres - https://opensource.com/article/17/10/set-postgres-database-your-raspberry-pi

* Node 
    - Do not use nvm as there are issues with sudo and RaspIO.
    - https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/#installing-nodejs-and-npm-from-nodesource


* Reset Database
    - Sync db (only run this if is the first time) `yarn run typeorm schema:sync -c development`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
