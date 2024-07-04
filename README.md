# Uptick CRUD Blog app using Prisma postgreSQL

A simple application using NodeJS built on ExpressJS and PostgreSQL with Sequelize ORM. 

This repository contains the source code for the uptick_prisma application. Follow the instructions below to set up the codebase on your local machine.

### Here is the [API Documentation](https://documenter.getpostman.com/view/26756602/2sA3dyhWbh)

# Table of Contents

- ### [Prerequisites](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#prerequisites-1)

- ### [Installation](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#installation-1)

- ### [Configuration](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#configuration-1)

- ### [Directory Structure](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#directory-structure-1)

- ### [Usage](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#usage-1)

- ### [Troubleshooting](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#troubleshooting-1)

- ### [Project Status](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#project-status-1)

- ### [License](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#license-1)

- ### [Credits](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#credits-1)

## Prerequisites

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

Before setting up the codebase, make sure you have the following prerequisites installed:

- Node.js (version 12 or above)
- PostgreSQL (version 4 or above)
- Git

## Installation

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

1. Clone the repository using Git:
   ```bash
   git clone https://github.com/Perpy-del/uptick_prisma.git
   ```
2. Change into the project directory:

    ```bash
    cd uptick_prisma
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Run the application

    ```bash
    npm run start
    ```

5. To run the prisma migrate to migrate the schema to the database, run the following command
    For development:
    ```bash
    npx prisma migrate dev
    ```

    For production:
    ```bash
    npx prisma migrate deploy
    ```

## Configuration

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

The codebase requires the following environment configurations:

1. Create a `.env` file in the root directory of the project.
2. Open the `.env` file and add the configuration from the .env.example file:

## Directory Structure

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

The codebase follows the following directory structure:

```bash

uptick-prisma/
├── app/
│   ├── index.ts
│   ├───http
        ├───controllers
        ├───middlewares
        ├───routes
    ├───errors
    ├───services
    ├───utilities
    ├───interfaces
├── dist/
│   ├── app/
│   │   ├── index.js
│   │   └── ... compiled js files ...
│   ├── server.js
├── node_modules/
├── prisma/
    ├── migrations
    ├── index.ts
    ├── schema.prisma
    ├── seed.ts
├── storage
    ├── blogDB.ts
├── config
├── server.ts
├── package.json
├── tsconfig.json
├── nodemon.json

```

- `app/`:Contains the main source code files
- `config/`:Contains the config files for the codebase.
- `storage/`:Contains the data store files for the codebase.
- `dist/`:Contains the compiled js files

## Usage

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

To start the uptick_prisma application on your local environment, run the following command:

npm run start

Visit `http://localhost:PORT/api` in your web browser to access the application.

**Base URL**
Main URL
https://uptick-prisma.onrender.com/api

## Troubleshooting

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

- If you encounter any issues during the setup process, please ensure that you have the latest versions of Node.js and PostgreSQL installed.
- If the application fails to start, make sure the PostgreSQL server is running and accessible.

## Project Status

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

This app is currently developed and maintained by me. The project is primarily for personal use or demonstration purposes.

## License

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

This codebase is released under the GNU General Public License(GPL). Please see the LICENSE.md file for more details.

## Credits

**[Back to Table of Contents](https://github.com/Perpy-del/uptick_prisma?tab=readme-ov-file#table-of-contents)**

The uptick_prisma App codebase is being developed by:
- [Perpetual Meninwa](https://github.com/Perpy-del)
- [Perpetual Meninwa's Portfolio](https://pm-portfolio-drab.vercel.app/)
- [Perpetual Meninwa's LinkedIn](https://linkedin.com/in/perpydev/)


