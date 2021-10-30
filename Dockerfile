FROM node:12

WORKDIR /ONLINE_STORE_API

COPY package*,json ./

RUN npm install

COPY . .

ENV PORT = 3000

EXPOSE 3000

CMD ["npm","start"]