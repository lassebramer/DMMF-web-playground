# DMMF web-playground

This is a web-playground to generate visual models from `.prisma` schemas.

## To Run

    npm install
    node server.js

## Build index.js with parcel

    npm install -g parcel-bundler
    parcel build src/index.ts -d public

Missing features

- Error message if pasting an invalid `.prisma` schema
- Syntax highlighting
- Drag 'n Drop `.schema` file
