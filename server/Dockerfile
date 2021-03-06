FROM node:7

# Run the workshop_voting node server to serve the GUI and provide REST services to GUI.
# Build container with:
#   docker build -t spdz/workshop-voting-gui .
# Run container with:
#   docker run -d --rm --name workshop_voting_gui -p 8080:8080 \ 
#        -v /home/me/config:/usr/app/config \
#        -v /home/me/logs:/usr/app/logs spdz/workshop-voting-gui:m.n.p

LABEL name="SPDZ workshop voting demonstrator GUI." \
      description="Provide the GUI and REST servcies for the workshop voting demo." \
      maintainer="Jonathan Evans" \
      license="University of Bristol : Open Access Software Licence" 

ENV NODE_ENV=production
ENV LOG_LEVEL=info
# Here because in certain deployments (UOB VMs) have to use internal IP to contact spdz proxies 
# and certificate is only valid for external hostname.
ENV NODE_TLS_REJECT_UNAUTHORIZED=1

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Pull in files (using .dockerignore to restrict)
# Not using npm install because complexity of accessing private github repo from docker.
COPY . /usr/app

EXPOSE 8080

# Mount workshop_voting specific config
VOLUME /usr/app/config
# Logs are kept
VOLUME /usr/app/logs

CMD exec node src/index.js 2>&1 | tee /usr/app/logs/voting-gui.log
