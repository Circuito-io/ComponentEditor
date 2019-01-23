'use strict';
module.exports = function(app) {
  var gitpodController = require('../controllers/gitpodController');

  app.route('/api/open/:path')
    .get(gitpodController.gitpodopen);
};