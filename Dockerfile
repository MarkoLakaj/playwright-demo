# Base image with Node and Playwright
FROM mcr.microsoft.com/playwright:v1.53.0-noble

# Set working directory
WORKDIR /playwright

# Copy app dependencies
COPY ./pw-practice-app/package*.json ./pw-practice-app/
# Copy test dependencies
COPY ./demo-framework/package*.json ./demo-framework/

# Install app dependencies
RUN cd pw-practice-app && npm install --force

# Install test dependencies
RUN cd demo-framework && npm install --force && npx playwright install

# Copy all files
COPY ./pw-practice-app ./pw-practice-app
COPY ./demo-framework ./demo-framework



