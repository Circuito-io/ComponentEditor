'use strict';
module.exports = function(app) {
  var partsblocks = require('../controllers/partsblocksController');

  app.route('/parts')
    .get(partsblocks.list_all_parts)
    .post(partsblocks.create_a_part);


  app.route('/parts/:name')
    .get(partsblocks.read_a_part)
    .put(partsblocks.update_a_part)
    .delete(partsblocks.delete_a_part);

  app.route('/blocks')
    .get(partsblocks.list_all_blocks)
    .post(partsblocks.create_a_block);


  app.route('/blocks/:name')
    .get(partsblocks.read_a_block)
    .put(partsblocks.update_a_block)
    .delete(partsblocks.delete_a_block);
};