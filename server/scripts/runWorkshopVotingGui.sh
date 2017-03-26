#!/bin/bash

docker run -d --rm --name workshop-voting-gui -p 443:8443 -e "LOG_LEVEL=debug" -v /opt/spdz/certs:/usr/app/certs -v /opt/spdz/gui-config:/usr/app/config -v /opt/spdz/logs:/usr/app/logs spdz/workshop-voting-gui:v0.1.0
