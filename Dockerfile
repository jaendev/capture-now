FROM node:18

# Working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy font code
COPY . .

# Command for initialice in development mode
CMD ["npm", "run", "dev"]