FROM node:7

# Run the workshop_voting node server to serve the GUI and provide REST services to GUI.
# Build container with:
#   docker build -t spdz/workshop_voting_gui .
# Run container with:
#   docker run -d --rm --name workshop_voting_gui -p 443:8443 \ 
#        -v /home/me/certs:/usr/app/certs spdz/workshop_voting_gui

LABEL name="Node docker demo" \
      description="Demonstrate and test https setup for node / express" \
      maintainer="Jonathan Evans" \
      license="MIT License" 

ENV NODE_ENV=production

# Create app directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Pull in files (using .dockerignore to restrict)
# Not using npm install because complexity of accessing private github repo from docker.
COPY . /usr/app

# Which will be served depends on https true or false in /usr/app/certs/config.json
EXPOSE 8080
EXPOSE 8443

# Mount https creds
VOLUME /usr/app/certs
# Mount workshop_voting specific config
VOLUME /usr/app/config

CMD [ "npm", "start" ]