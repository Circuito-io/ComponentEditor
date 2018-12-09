'use strict';
module.exports = function(app) {
  var preview = require('../controllers/previewController');

  app.route('/preview')
    .get(preview.preview);
};