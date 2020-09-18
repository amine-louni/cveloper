const Tag = require('../models/Tag');
const handlerFactory = require('../utils/handlerFactory');

exports.createTag = handlerFactory.createOne(Tag);
exports.getAllTags = handlerFactory.getAll(Tag);
exports.getOneTag = handlerFactory.getOne(Tag);
exports.updateOneTag = handlerFactory.updateOne(Tag);
exports.deleteTag = handlerFactory.deleteOne(Tag);
