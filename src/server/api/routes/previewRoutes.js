'use strict';
module.exports = function(app) {
  var previewController = require('../controllers/previewController');

  app.route('/api/preview')
    .get(previewController.preview);
};