# Node.js

- Node.js is a JS runtime environment.
- Runtime enviroment: A program that runs another program.
- With the help of node.js, we can run JS in local machine.
- Used to build: API, real time apps, micro-services, server
- Built on C++
- Powered by Google Chrome V8 engine

## Architecture

- Single threaded
- Non-blocking I/O operation
- Event loop

### API (Application program interface)

## Node.js modules

1. File System
2. Path
3. Url
4. HTTP
5. Event
6. OS

## Async Programming

- Callback
- Promise
  - Async/Await

# Express.js

- It is a Node.js API/Web framework.
- Used to build API
- Minimalist, fast, unopinionated framework
- It simplifies the HTTP module of node.js

## HTTP Methods

- GET (Read/Fetch)
- POST (Create)
- PUT (Update)
- DELETE (Delete)
- PATCH (Partial Update)

## REST (Representational State Transfer) API

JSON.stringify(): JS Object => JSON
JSON.parse(): JSON => JS Object

JSON => JavaScript Object Notation => Lightweight string format

---

Get users data: GET /users
Create user: POST /users
Create product: POST /products
Update product: PUT /products/:id

---

## Layered Architecture

1. API Layer
   a. Routes: Endpoints
   b. Controllers: Request/Response
   c. Middlewares: Auth
2. Business Logic Layer
   a. Services
3. Data layer
   a. Models: Schemas

# MongoDB

- Non-relational database
- Data are stored in collections & documents
- Database: Main container, all collections and data are stored
- Collection: Equivalent to table of relational DB
- Document: Equivalent to Row
- Field: Equivalent to Column

## Tools used

- Local: MongoDB Compass
- Cloud: MongoDB Atlas

## Run MongoDB in compass

1. Open mongodb compass
2. Setup a new connection (mongodb://localhost:27017)[mongodb://localhost:27017]

## MongoDB Queries

- `show dbs` : Show list of databases
- `use <dbname>` : Use existing db or create a new one and use it
- `cls` : Clear screen
- `show collections` : Show list of collections

1. Create

- `db.users.insertOne({name:"Ram"})`
- `db.users.insertMany([{name:"Sita"},{name:"Gita"}])`

2. Read

- `db.users.find()`
- `db.users.find({age:20})`
- `db.users.findOne({age:20})`

3. Update

- `db.users.updateOne({name:"Ram"}, {$set:{age:23}})`

4. Delete

- `db.users.deleteOne({name:"Ram"})`

## Complex filters

1. $eq: db.users.find({name:{$eq:"Mina"}})
2. $ne: db.users.find({name:{$ne:"Mina"}})
3. $gt/$gte: db.users.find({age:{$gte:20}})
4. $lt/$lte: db.users.find({age:{$lte:20}})
5. $and: db.users.find({$and:[{name:"Mina"}, {age:30}]})
6. $or: db.users.find({$or:[{name:"Mina"}, {age:30}]})

a. limit: db.users.find().limit(3)
b. skip: db.users.find().skip(1)
c. sort: db.users.find().sort({name:-1}) | ASC (1), DESC (-1)

## Mongoose

- ODM (Object Data Modeling) of MongoDB for Node.js
- Create schema (properties or rules of a data/entity)
- Validate schema
- Create models (usable form of schema) using schema
- Relationships

## Naming formats/cases

sentence case
camelCase
PascalCase
kebab-case
snake_case

## HTTP Methods

1. GET - Read/Fetch
2. POST - Create/Add
3. PUT - Update
4. DELETE - Delete
5. PATCH - Partial update

## Cryptography

### Encryption

- Converting readable text into cipher text (unreadable format)
- hello -> a8dsfuasnfua-s0dfnuadf8unasdf-0ansdf09

### Decryption

- Converting cipher text into readble format
- a8dsfuasnfua-s0dfnuadf8unasdf-0ansdf09 -> hello

### Hashing

- One way encryption
- Convert the readable text to cipher text but not back to readable
- hello -> asdufhasdofhasdpifhasdf
- Hashing always returns same cipher of a given input

### Salt

- Adding random characters in the hash
- hello -> assdufhasfdofh3asdpifh3xasd4f3
- hello -> asfdufhasdgofhasdgpifhasdfhfh

## Authentication/Authorization

- Authentication: Who you are? Logged in user
- Authorization: What you can do? User role

## JSON Web Token (JWT)

- Self verified token
- Tamper proof
- Used for both authentication and authorization
- Structure: Header, Payload, Signature

## Auth process

1. Login/Register success
2. Generate token (JWT)
3. Store token: Cookie, Session, Local Storage
4. Append the token (JWT) in every request
5. Verify the token and authenticate/authorize the user (Middleware)

## Storage

1. Cookie storage

- Size: 4KB
- Storage: Browser & Server
- Expiry: Cookie expiry

2. Session storage

- Size: 5MB
- Storage: Browser
- Expiry: On tab close

3. Local storage

- Size: 5MB
- Storage: Browser
- Expiry: Never (Permanent)

## Middleware

- Function (controller) that lies between request and response
- Function that has access of both request and response object, and can modify them
- It has additional functionality to go to the next() call

Browser ------> Request --------> Server
Middleware Middleware Middleware
Server -------> Response -------> Browser

### Usage

- Logging (Log report)
- Authentication & Authorization
- Request & Response object modification
- Error handling
- Data validation

## HTTP Status Codes

1. 2xx (Success)

- 200 OK
- 201 Create

2. 3xx (Redirection)

3. 4xx (Client Error)

- 400 Bad request
- 401 Unauthorized
- 403 Forbidden
- 404 Not found
- 409 Conflict
- 422 Unproccessable Entity

4. 5xx (Server Error)

- 500 Internal server error
- 504 Timeout

## File upload to Cloudinary

- Files are stored in bucket
- Storage: Cloudinary (cloud bucket to store assets/media files)
- Input type: multipart/form-data
- Multipart/form-data handler: multer

### File upload process

1. When a file (with or without addition data) is sent through frontend/postman as multipart/form-data, multer handles it
2. Multer temporarily stores the file in local folder or in RAM
3. Upload the temp file to cloudinary
4. After successful upload, cloudinary provides a public url
5. Store this public url in the database
6. Remove the temp file if necessary

=======================================

- Email
- Reset password
- User management
- AI integration
- Deployment
- Template engine

=============

### During react session

- Payment (Khalti, Stripe, COD)
- CORS
- API Integration
- SaaS for Merchant
