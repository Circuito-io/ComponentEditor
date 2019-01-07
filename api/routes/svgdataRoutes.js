'use strict';
module.exports = function(app) {
  var svgdataController = require('../controllers/svgdataController');

  app.route('/svgdata/:img')
    .get(svgdataController.svgdata);
};