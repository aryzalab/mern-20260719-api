import http from "http";

const server = http.createServer((request, response) => {
  console.log(request.url);

  switch (request.url) {
    case "/about":
      return response.end("<h1>About page</h1>");

    case "/contact":
      return response.end("<h1>Contact page</h1>");

    case "/":
      return response.end("<h1>Home page</h1>");

    default:
      response.writeHead(404);
      return response.end("<h1>404 page not found.</h1>");
  }

  //   response.writeHead(200, {
  //     "content-type": "application/json",
  //   });

  //   response.end(JSON.stringify({ status: "Ok" }));

  //   response.writeHead(200, {
  //     "content-type": "text/html",
  //   });

  //   response.end("<h1>Hello world</h1>");
});

server.listen(3000, () => {
  console.log("Server running at port 3000...");
});
