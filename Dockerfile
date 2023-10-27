# Use an official Node.js runtime as the base image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the Next.js application files into the container
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=production

# Start the Next.js application
CMD ["npm", "start"]
