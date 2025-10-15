USER AND ORDER MODEL SERVER
How to run:
- git clone <URL>
- cd <foldername>
- npm i
- node index.js or npx nodemon index.js
- Note create a .env file and paste your mongo db url under MONGO_URI and port under port
- DONE!!!

Endpoints:
- To create a new user:
(POST) http://localhost:3001/createuser
body{
    "name":"name of the user",
    "username":"username"
}

- To create a new order for that user:
(POST) http://localhost:3001/createorder
body{
    "name":"name",
    "id":743,
    "username":"username from user table"
}

- To delete an existing order for that user:
(POST) http://localhost:3001/deleteorder
body{
    "id":743
}

- The main logic is user create a user and each user can create orders and store it in the database.
- The second thing is use id to delete the order
- The second thing is create a user id with name and username (unique) and create an order with id and name and username from user table
- Unique entry check is done for both user table and order table so that no duplicate entries exist 
