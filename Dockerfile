# include latest node base image for docker environment
FROM node:16

# include app source code in image
WORKDIR /home/kevin/yeet

# copy local package json location into working directory
COPY package*.json ./

# install dependencies and commit to docker image
RUN npm install

# copy source code to docker image ignoring node modules and local envs
COPY . .

# access node-js app on port 8080
ENV PORT=8080

EXPOSE 8080

# serve express app
CMD ["npm", "start"]
