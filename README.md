USER AND ORDER MODEL SERVER

endpoints :
http://localhost:port/createuser
body{
"name":"nameeeee",
"username":"username"
}

http://localhost:port/createorder
body{
"name":"name",
"id"743,
"username":"username from user table"
}


http://localhost:port/deleteorder
body{
"id"743
}

- The main logic is user create a user and each user can create orders and store it in the database.
- The second thing is use id to delete the order
- The second thing is create a user id with name and username (unique) and create an order with id and name and username from user table
- Unique entry check is done for both user table and order table so that no duplicate entries exist 
