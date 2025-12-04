# Use Node.js base image
FROM node:18-alpine

# Create app working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application code
COPY . .

# Expose the service port
EXPOSE 5002

# Command to run the service
CMD ["node", "server.js"]
