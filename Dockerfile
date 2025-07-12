# Use Node base image
FROM node:18

# Install Chromium dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    xdg-utils \
    --no-install-recommends

# Set working dir
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Set Puppeteer to use system Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Run your bot
CMD ["node", "index.js"]
