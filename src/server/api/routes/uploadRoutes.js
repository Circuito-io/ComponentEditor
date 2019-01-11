'use strict';
module.exports = function(app) {
  var upload = require('../controllers/uploadController');

  app.route('/api/upload')
    .get(upload.upload);
};