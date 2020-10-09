'use strict';

module.exports = function(app) {
  var quotes = require('../controllers/quotesController');

  app.route('/quotes')
    .get(quotes.list_all_quotes)
};
