'use strict';
module.exports = function(app) {
  var parts = require('../controllers/partsController');

  app.route('/parts')
    .get(parts.list_all_parts)
    .post(parts.create_a_part);


  app.route('/parts/:name')
    .get(parts.read_a_part)
    .put(parts.update_a_part)
    .delete(parts.delete_a_part);
};