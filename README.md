### MediaMarkApp

# Project Overview
Do you ever want to keep track of your consumed media, but don't want services grabbing your information, like creating an account? MediaMarkApp is a personal project for bookmarking your media. It is a  web app, which means if you want to run it on a server you can, I use this locally on my machine to bookmark pages on my ebooks. The app will allow users to add, edit, and delete their favorite media. 

# Features
- Three main categories: Comics, Novels, Videos.
- Add, Edit, Delete, Update (CRUD) operations for each category.
- Uses PostgreSQL as the database, ExpressJS for the backend, and React with TypeScript for the frontend.
- Uses Docker for development and production environments.
- Uses Nginx as a reverse proxy for production environments.


# Installation
- Clone Repo
- Make sure you have Docker installed on your machine. 
- Move into repo directory and run `docker-compose up --build` to build and start containers.
- At http://localhost:5750/ app should be running, you can change this in the compose file if needed.
- Stop containers with `docker-compose down`.
- If you want to run it on a server, make sure to change the PORT/Enviornment Variables in the compose files and nginx config file.
