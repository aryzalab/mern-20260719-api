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

-------------
Get users data: GET /users
Create user: POST /users
Create product: POST /products
Update product: PUT /products/:id
-------------

## Layered Architecture

1. API Layer
  a. Routes: Endpoints
  b. Controllers: Request/Response
  c. Middlewares: Auth
2. Business Logic Layer
  a. Services
3. Data layer
  a. Models: Schemas
