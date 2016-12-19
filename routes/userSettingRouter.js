/**
 * Created by Administrator on 11/17/2016.
 */

var express = require('express'),
    userSettingsRouter = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var Verify = require('./verify');
var UserSettings = require('../models/UserSettings');
userSettingsRouter.use(bodyParser.json());
var User = require('../models/User');

userSettingsRouter.route('/')
  .get(Verify.verifyUser, function (req, res, next) {
  console.log(req.decoded.sub);
      UserSettings.findOne({'postedBy': req.decoded.sub})
          .populate('postedBy')
          .exec(function (err, userSettings) {
              if (err) throw err;
              res.json(userSettings);
          });
  })
   // .put(Verify.verifyUser, function (req, res, next) {
   //     console.log(req.decoded.sub);
   //     UserSettings.findOne({'postedBy': req.decoded.sub})
   //         .populate('postedBy')
   //         .exec(function (err, userSettings) {
   //             if (err) throw err;
   //             console.log("========================================")
   //             console.log(userSettings);
   //             console.log("========================================")
   //            var fav = new UserSettings({
   //                mainHeader: userSettings.mainHeader,
   //                mainContent: userSettings.mainContent,
   //                mainBackground: req.body.mainBackground,
   //                postedBy: req.decoded.sub
   //            });
   //            res.json(userSettings);
   //         });
   // })

//.get(function (req, res, next) {
//    UserSettings.find({})
//        .populate('postedBy')
//        .exec(function (err, userSettings) {
//            if (err) {
//                console.log('Error obtaining the userSettings: ' + err);
//            }
//            res.json(userSettings);
//        })
//})
 //  .post(Verify.verifyUser, function (req, res, next) {

 //      var fav = new UserSettings({
 //          username:req.body.username,
 //          contentMain: req.body.contentMain,
 //          mainBackground: req.body.mainBackground,
 //          mainBackgroundTextLeft:req.body.mainBackgroundTextLeft,
 //          mainBackgroundTextRight:req.body.mainBackgroundTextRight,
 //          postedBy: req.decoded.sub,
 //          carouselImgOne:req.body.carouselImgOne,
 //          carouselImgOneText:req.body.carouselImgOneText,
 //          carouselImgTwo:req.body.carouselImgTwo,
 //          carouselImgTwoText:req.body.carouselImgTwoText,
 //          carouselImgThree:req.body.carouselImgThree,
 //          carouselImgThreeText:req.body.carouselImgThreeText,
 //          bottomLeftObject: req.body.bottomLeftObject,
 //          bottomMiddleObject: req.body.bottomMiddleObject,
 //          bottomRightObject:req.body.bottomRightObject
 //      });
 //      fav.save(function (err, fav) {
 //          if (err) throw err;

 //          res.json(fav);
 //      });

 //  })

.post(Verify.verifyUser,function (req, res, next) {

   UserSettings.create(req.body, function (err, userSettings) {
       if (err) {
           console.log('Cant create userSettings ' + err);
       }
       console.log(userSettings);
       var id = userSettings._id;
       //var id = req.sub;
       res.writeHead(200, {'Content-Type': 'text/plain'});
       res.end('UserSettings added with id: ' + id);
   });
})
    .delete(function (req, res, next) {
        //res.end('All dishes will be deleted');
        UserSettings.remove({}, function (err, response) {
            if (err) {
                throw err;
            }
            res.json(response);
        })
    });


userSettingsRouter.route('/:userSettingsId')
    .get(function (req, res, next) {
        // console.log(req.decoded.sub);
        UserSettings.findById(req.params.userSettingsId, function (err, userSettings) {
            if (err) {
                console.log("Error getting user settings: " + err);
            }
            res.json(userSettings);
        });
    })
    .put(Verify.verifyUser,function (req, res, next) {
        UserSettings.findByIdAndUpdate(req.params.userSettingsId, {$set: req.body}, {new: true},
            function (err, userSettings) {
                if (err) {
                    console.log('Error updating user settings' + err);
                }
                res.json(userSettings);
            })

    });

module.exports = userSettingsRouter;