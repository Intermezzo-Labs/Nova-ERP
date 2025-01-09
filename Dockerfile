# Use a Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application
COPY . .

# Expose the port SvelteKit uses (default is 3000)
EXPOSE 3000

# Start the app
CMD ["node", "build"]