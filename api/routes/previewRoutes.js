'use strict';
module.exports = function(app) {
  var previewController = require('../controllers/previewController');

  app.route('/preview')
    .get(previewController.preview);
};