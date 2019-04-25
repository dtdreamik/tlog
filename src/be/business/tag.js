const models = require('../models');

const tag = models.tag;

module.exports = {
    getAllTags: function() {
        return tag.findAll();
    }
};