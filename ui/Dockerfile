# build environment
FROM timbru31/node-alpine-git as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
COPY . /app
ARG REACT_APP_BACKEND_ENDPOINT
ENV REACT_APP_BACKEND_ENDPOINT $REACT_APP_BACKEND_ENDPOINT
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]