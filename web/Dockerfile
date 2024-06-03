# FROM node:alpine as build
# WORKDIR /web
# COPY . .
# RUN npm install --force
# RUN npm run build --force

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /web/build /usr/share/nginx/html
# COPY --from=build /web/.nginx/conf/nginx.conf /etc/nginx/sites-enabled/default
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install --production --force

# Copy all files
COPY ./ ./

# Build app
RUN npm run build --force

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "npm", "start" ]