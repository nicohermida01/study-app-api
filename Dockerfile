FROM node:22-alpine
RUN mkdir /myapp
WORKDIR /myapp

COPY package.json /myapp/package.json
COPY package-lock.json /myapp/package-lock.json
RUN npm install
COPY . /myapp

#RUN npm run build
EXPOSE 8001

CMD ["npm", "run", "start:dev"]