# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json) to the container
COPY package.json yarn.lock* ./

# Set the environment variables
ENV JWT_SECRET ${JWT_SECRET}
ENV DATABASE_URL ${DATABASE_URL}

RUN echo ${JWT_SECRET}
RUN echo ${DATABASE_URL}

# Install dependencies
RUN yarn install

# Copy the rest of the app's source code to the working directory
COPY . .

# Run database migrations
RUN yarn prisma migrate

# Generate the Prisma client
RUN yarn prisma generate

# Build the Nest.js app
RUN yarn build

# Expose the app's port (assuming it listens on port 3000)
EXPOSE 3001

# Run the app
CMD ["node", "dist/main"]