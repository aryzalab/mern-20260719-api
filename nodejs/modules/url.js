const codeitUrl =
  "https://www.codeit.com.np/popular-courses/mern?q=react&duration=1month";

const urlObject = new URL(codeitUrl);

console.log(urlObject);

console.log(urlObject.host);
console.log(urlObject.pathname);

console.log(urlObject.searchParams);
