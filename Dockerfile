# Start from node base image
FROM node:14.15.1-alpine as builder
# Set the current working directory inside the container
WORKDIR /build
# Copy package.json,  files and download deps
COPY package.json package-lock.json ./
RUN npm install -g @nestjs/cli --silent
RUN npm install --silent
# Copy sources to the working directory
COPY . .
# Set the node environment
ARG node_env=production
ENV NODE_ENV $node_env
# Build the Node.js app
ARG project
RUN yarn build $project
# Start a new stage from node
FROM node:14.15.1-alpine
WORKDIR /setel-assignment
# Set the node environment (nginx stage)
ARG node_env=production
ENV NODE_ENV $node_env
# Copy the build artifacts from the previous stage
ARG project
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/apps ./apps
COPY package.json package-lock.json ./
RUN npm install --silent
# Run server
CMD ["node", "./dist/apps/setel-assigment/main.js"]