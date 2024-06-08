# Use the official Bun image as the base
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Install dependencies into a temporary directory to cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN cd /usr/src/app && ls

# Install production dependencies only
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

RUN cd /usr/src/app && ls

# Copy node_modules from the temporary directory, then copy all project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules /usr/src/app/node_modules
COPY . /usr/src/app

RUN cd /usr/src/app && ls

# Copy production dependencies and source code into the final image
FROM base AS release
COPY --from=install /temp/prod/node_modules /usr/src/app/node_modules
COPY --from=prerelease /usr/src/app/ /usr/src/app/

RUN cd /usr/src/app && ls

# Set the user to 'bun', expose the application's port, and define the entry point
USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "index.ts"]
