FROM node:10
COPY . /code
RUN cd /code
RUN npm install
RUN npm start