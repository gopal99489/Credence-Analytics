# Define the base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your application code
COPY . .

# Expose port (replace 3000 with your app's port)
EXPOSE 5000

# Start the command (replace "start" with your app's start script)
CMD [ "node", "./src/server/server.js" ]

