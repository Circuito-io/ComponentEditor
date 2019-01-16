'use strict';
module.exports = function(app) {
  var svgdataController = require('../controllers/svgdataController');

  app.route('/api/svgdata/:img')
    .get(svgdataController.svgdata);
};