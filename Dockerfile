FROM node:18.17.1-alpine as build
WORKDIR /lolmood/web
COPY package*.json ./
RUN yarn install
COPY . .

# DEV ENV ONLY
CMD ["yarn", "start"]

# PROD ENV ONLY
# RUN yarn build
# FROM nginx:stable-alpine
# COPY --from=build /lolmood/web/build /usr/share/nginx/html
# COPY --from=build /lolmood/web/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]