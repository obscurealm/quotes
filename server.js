var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

if (!module.parent) {
  app.listen(port);
}

var routes = require('./api/routes/quotesRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('quotes RESTful API server started on: ' + port);

module.exports = app;
