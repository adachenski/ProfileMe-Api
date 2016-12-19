/**
 * Created by Administrator on 11/17/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSettingsSchema = new Schema({
    username: String,
    contentMain:String,
    mainBackground: String,
    mainBackgroundTextLeft:String,
    mainBackgroundTextRight:String,
    carouselImgOne:String,
    carouselImgOneText:String,
    carouselImgTwo:String,
    carouselImgTwoText:String,
    carouselImgThree:String,
    carouselImgThreeText:String,
    bottomLeftObject:String,
    bottomMiddleObject: String,
    bottomRightObject:String,
    bodyColor:String,
    logo:String,
    startButton:String,
    viewOne:Boolean,
    viewTwo:Boolean,
    navbarStatic:String,
    navbarFooterColor:String,
    footerTitle: String,
    footerLeft: String,
    footerMiddle: String,
    footerRight: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});


var UserSettingsModel = mongoose.model('UserSettingModel', UserSettingsSchema);

module.exports = UserSettingsModel;