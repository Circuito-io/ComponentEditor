'use strict';
module.exports = function(app) {
  var upload = require('../controllers/uploadController');

  app.route('/upload')
    .get(upload.upload);
};