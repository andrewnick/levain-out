## PI install

* Development
    - `sudo yarn dev`

* Production
    - `sudo yarn start`

* Postgres - https://opensource.com/article/17/10/set-postgres-database-your-raspberry-pi

* Node 
    - Do not use nvm as there are issues with sudo and RaspIO.
    - https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/#installing-nodejs-and-npm-from-nodesource


* Reset Database
    - Sync db (only run this if is the first time) `yarn run typeorm schema:sync -c default`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

* Create a self signed key
This may need to be updated from time to time
https://linuxize.com/post/creating-a-self-signed-ssl-certificate/

```bash
openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out /home/pi/.ssl/express.crt \
            -keyout /home/pi/.ssl/express.key \
            -subj "/C=NZ/ST=Canterbury/L=Christchurch/O=Individual/OU=IT Department/CN=raspberrypi.local"
```

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Setting up a service on the pi
From https://simonprickett.dev/writing-a-systemd-service-in-node-js-pi/

1. Create a service file e.g. levain-out.service
2. Run `sudo cp levain-out.service /etc/systemd/system`
3. Run `sudo systemctl enable levain-out.service` (this tells systemctl to enable on boot)

*Other useful commands:*
* Manually start a service: `sudo systemctl start levain-out.service`
* Reboot the pi: `sudo reboot`
* View logs for this service: `journalctl -u levain-out` or `journalctl -u levain-out -f` to tail the log