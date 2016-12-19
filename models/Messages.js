/**
 * Created by Administrator on 12/11/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessagesSchema = new Schema({

    title:String,
    content:String,
    postedById:String
},{timestamps: true});

var MessageModel = mongoose.model('Messages',MessagesSchema);

module.exports = MessageModel;