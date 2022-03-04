## Server Commands
server-dev:
	cd server && sudo yarn dev
server-live:
	cd server && sudo yarn start
server-logs:
	journalctl -u levain-out -f
stop-server-service:
	sudo systemctl stop levain-out.service
ssl-cert:
	openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out /home/pi/.ssl/express.crt \
            -keyout /home/pi/.ssl/express.key \
            -subj "/C=NZ/ST=Canterbury/L=Christchurch/O=Individual/OU=IT Department/CN=raspberrypi.local"

## App Commands
app-dev:
	cd app && yarn dev
app-build:
	cd app && yarn build
app-live:
	cd app && yarn start	