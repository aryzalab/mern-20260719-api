const logger = (req, res, next) => {
  const httpMethod = req.method;
  const url = req.originalUrl;

  const currentTimestamp = new Date(Date.now()).toISOString();

  console.log(`${currentTimestamp} ${httpMethod} ${url}`);

  next();
};

export default logger;
