FROM node:lts-alpine

WORKDIR /app
# * to copy package.json and packagelock.json

# copy from source to desination thats app folder
COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

# to do when docker container starts up
CMD ["npm", "start", "--prefix", "server"]

# which port to make it available outside of our existing container
EXPOSE 8000