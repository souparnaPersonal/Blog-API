# Blog API Application

Welcome to the **Blog API**! This is a simple API built with **Express**, **TypeScript**, **MongoDB**, **Mongoose**, and **ESLint**. It allows you to add blogs , update , delete and also have admin access who can delete user and blog.
Also have authentication with jwt here user can login and also register

### Api Live Link : https://blog-api-v2-eight.vercel.app/

### Video Explanation : https://drive.google.com/file/d/1ONZ2CBcHWTs0jB7UkAEQMfz_BXY61uis/view?usp=sharing

## Admin

"password": "securePassword123",
"email": "admin@gmail.com"

## Features

## User Roles and Permissions

### Admin

- Admins are created manually in the database with predefined credentials.
- **Can delete any blog**: Admin has the ability to delete any blog.
- **Can block any user**: Admin can block users by updating the `isBlocked` property in the user database.
- **Cannot update any blog**: Admin cannot modify any blog content.

### User

- **Can register and log in**: Users can create accounts and authenticate themselves.
- **Can create blogs**: Users can create new blogs when logged in.
- **Can update and delete their own blogs**: Users can modify or delete only their own blogs.
- **Cannot perform admin actions**: Users do not have the ability to delete blogs or block other users.

## Technologies Used

- **Node.js** & **Express** (Backend Framework)
- **TypeScript** (For type safety)
- **MongoDB** & **Mongoose** (Database)
- **ESLint** (For code linting)
- **Prettier** (For code formatting)
- **MongoDB Atlas** (Cloud Database)
- **JsonWebToken** (for authentication)

## Prerequisites

Ensure the following tools are installed on your system:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager)
- **MongoDB**: [Install MongoDB locally](https://www.mongodb.com/try/download/community) or use **MongoDB Atlas** (cloud database)

## How to Run the Application Locally

Follow these steps to run the **BookShop API** locally:

### Step 1: Clone the Repository

### Step 2: Run "npm i"

### Step 3: Connect with mongodb

### Step 4: create env file
