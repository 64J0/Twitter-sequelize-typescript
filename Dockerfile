# node:<version>-alpine
# This image is based on the popular Alpine Linux Project. Alpine Linux is much smaller than most distribution base images 
# (~5MB) and thus leads to much slimmer images in general.
FROM node:14.16.0-alpine

# Create directory
WORKDIR /home/twitter-sequelize-typescript

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install NPM dependencies
RUN npm install

# Bundle app source
COPY . .

# Change config file
COPY ./src/config/database.docker.json ./src/config/database.json

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]