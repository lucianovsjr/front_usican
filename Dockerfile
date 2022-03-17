FROM node:14.17.6 as build
LABEL maitainer 'Luciano Junior <lucianovsjr@hotmail.com>'

RUN mkdir /front_usican
WORKDIR /front_usican

COPY ./package.json /front_usican/
COPY ./yarn.lock /front_usican/
RUN yarn

COPY ./public /front_usican/public
COPY ./src /front_usican/src
RUN yarn build

FROM nginx:1.20.2
COPY --from=build /front_usican/build /usr/share/nginx/html
RUN apt-get update && apt-get upgrade -y

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
