FROM node:5.10.1
MAINTAINER openJT
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY . /usr/src/app/

ENV NODE_ENV=production
ENV docker_mongo_name=mongo

RUN npm install
EXPOSE 8080
CMD ["npm", "start"]