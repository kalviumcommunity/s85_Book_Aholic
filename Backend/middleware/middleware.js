// middleware.js

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const notFound = (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = {
  logger,
  notFound,
  errorHandler,
};
