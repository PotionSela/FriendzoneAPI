# FriendzoneAPI

---

FriendzoneAPI is a robust social network API project built using Express.js, MongoDB, and Mongoose ODM, allowing users to share thoughts, interact with friends' thoughts, and manage their friend lists. With comprehensive CRUD functionality for users, thoughts, reactions, and friend relationships.


## Table of Contents
- [Description](#description)
- [Live Recording](#live-recording)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Features](#features)
- [Usage Information](#usage-information)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Questions](#questions)


---

## Description

This application marks the inception of a full stack social network utilizing MongoDB, Express.js, and Mongoose ODM. It establishes the fundamental CRUD API routes for user management and interaction features like sharing thoughts and managing friend lists. Despite being in its early stages, the integration of MongoDB and middleware routing signifies a crucial starting point for exploring their capabilities. Challenges arose in navigating MongoDB's flexible querying and error handling, particularly in managing data deletion and table joins efficiently. 

---

## Live Recording

Link to live recording [here!](Link)

---

## Screenshots
![example](./example)
![example](./example)
![example](./example)

---

## Technology Used
This application leverages Node.js (v16.19.1), Express.js (v4.18.2), JavaScript, MongoDB, and Mongoose (v7.2.2). It relies on npm dependencies like express and mongoose, with Nodemon (v2.0.9) for automatic server refreshing during development. MongoDB Compass visualizes the database, while Insomnia tests the functionality of routes.

---

## Installation
1. Clone the repo: git clone https://github.com/PotionSela/FriendzoneAPI.git
2. Open VS Code, if you don't have it, install it
3. Using the terminal install node.js v16
4. Once node.js v16 is installed, in the terminal, use the command npm init -y to initialize and create a package.json
5. Next, use the terminal to run the command npm i to install the dependencies needed for this application.
    - npm i express@4.17.1
    - npm i mongoose
    - npm i nodemon
6. Next, you will want to make sure you have access to MongoDB by having an account and have MongoDB Compass. These will allow you to interact with the database and visually confirm what changes are being made in the database.
7. Once you have installed all the dependencies, right click on the server.js file to get to an integrated terminal, then you can run the command npm start to start the server.
8. Then you can use applications like Insomnia to test each route and their functionality.

---

## Features
The features of this application include the ability to create users and thoughts, find all the users and their thoughts. Finding a single user and thought, update those users, and the thoughts. And to be able to delete a user/thought. You can add reactions to particular thoughts from their Id's. You can also add friends to users. Once a thought, reaction, or friend is added to the database, it will update within the user objects accordingly.

---

## Usage Information
Right now this application has usage abilities that can be conducted through starting the server with npm start, or node server.js, then going to an application like Insomnia, or Postman and test the different API end points. For more information on starting up the server, MongoDB Compass installation navigate to the Installation section above.

---

## Contribution Guidelines
If you would like to contribute, this project is open to collaboration. If you choose to do so, open an issue and modify any changes you would like to see on a feature branch and wait for approval before merging to the main branch.

---

