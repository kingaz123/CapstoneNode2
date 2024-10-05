# Cinema System API

## Overview

This project is a backend API for a cinema booking system, using Express.js and Prisma ORM with a MySQL database.

## Prerequisites

- Docker
- Node.js (v14 or later)
- yarn

## Setup Instructions

Follow these steps to set up and run the project:

1. Clone this Repository

2. Set Up MySQL Container (Optional)
   
   If you don't have MySQL installed locally, you can run a MySQL container using Docker:
   ```
   docker run --name mysql_cinema -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=cinema_system -p 3306:3306 -d mysql:latest
   ```
   Note: If you're using a local MySQL installation, skip this step and update the DATABASE_URL in the next step accordingly.

3. Configure Environment Variables
   
   Create a `.env` file in the project root with the following content:
   ```
   # Database configuration
   DATABASE_URL="mysql://root:123456@localhost:3306/cinema_system"

   # JWT configuration
   SECRET_KEY="king12345"
   EXPIRES_IN="1d"

   # Server configuration
   PORT=8080

   # Image URL configuration
   URL_IMAGE="http://localhost:8080/public/images"

   # Other configurations
   NODE_ENV=development
   ```

4. Install Dependencies
   
   ```
   yarn install
   ```

5. Initialize Database Schema
   
   Run the following commands to set up the database schema:
   ```
   yarn prisma:migrate
   yarn prisma:generate
   ```
   This step creates the necessary tables and relationships in your database based on your Prisma schema.

6. Seed Initial Data
   
   Run the following command to seed initial data:
   ```
   yarn prisma:seed
   ```

7. Start the Server
   ```
   yarn start
   ```

8. Set Up Postman Environment Variable

Before testing the API endpoints, set up a local environment in Postman:

a. Click on the "Eye" icon in the top right corner of Postman.

b. Click "Add" to create a new environment.

c. Name your environment (e.g., "Local Development").

d. Add a new variable:

- Variable name: domain
  
- Value: http://localhost:8080/api
  
e. Click "Save" to save the environment.

f. Select the newly created environment from the dropdown menu in the top right corner of Postman.

9. Test API Endpoints
    
   Use Postman or any API testing tool to test the endpoints. A Postman collection file named "postman.json" is included in this repository. You can import this file into Postman to quickly set up and test all available API endpoints.



