# Car Website

A web application for managing car listings with user authentication.

## Project Overview

Car listing platform where users can register, login, and manage their car collection.

## API Documentation

### Authentication Routes (Public)
POST /api/auth/register Register new user   
POST /api/auth/login Login user 

### User Routes (Private)
GET /api/users/profile Get user profile  
PUT /api/users/profile Update profile 

### Car Routes (Private)
POST /api/cars Create new car 
GET /api/cars Get all cars 
GET /api/cars/:id Get specific car 
PUT /api/cars/:id Update car  
DELETE /api/cars/:id Delete car  

## Technologies

Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT, bcryptjs
Validation: Joi


## LINK 
https://car-website-u3is.onrender.com
