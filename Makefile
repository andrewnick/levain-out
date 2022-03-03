ssl-cert:
	openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out /home/pi/.ssl/express.crt \
            -keyout /home/pi/.ssl/express.key \
            -subj "/C=NZ/ST=Canterbury/L=Christchurch/O=Individual/OU=IT Department/CN=raspberrypi.local"
server-dev:
	cd server && sudo yarn dev
server-live:
	cd server && sudo yarn start	

app-dev:
	cd app && yarn dev
app-live:
	cd app && yarn start	