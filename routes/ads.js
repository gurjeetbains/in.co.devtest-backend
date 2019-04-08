const express = require("express")
const router = express.Router();
const Ads = require('../models/Ads');
const adCheck = require('../checks/adCheck');
const passport = require('passport');
const validator = require('validator');

router.post('/getad', passport.authenticate('auth-token', {
    session: false
}), async (req, res) => {
    try {
        //const userid = req.params.userid;
        const userid = req.body.userid;
        const ads = await Ads.find({
            createdBy: userid
        });
        res.send(ads);
    } catch (err) {
        res.status(500).json("There is something wrong");
    }
});

router.post('/postad', passport.authenticate('auth-token', {
    session: false
}), async (req, res) => {
    try {
        const errors = adCheck(req);
        if (Object.keys(errors).length) {
            return res.status(500).json(errors);
        }
        let title = validator.trim(req.body.title ? req.body.title : '');
        let adContent = validator.trim(req.body.adContent ? req.body.adContent : '');
        let createdBy = req.body.createdBy ? req.body.createdBy : '';
        let adType = validator.trim(req.body.adType ? req.body.adType : '');
        let imagevideo = validator.trim(req.body.imagevideo ? req.body.imagevideo : '');

        const ads = new Ads({
            title: title,
            adContent: adContent,
            createdBy: createdBy,
            adType: adType,
            imagevideo: imagevideo
        });
        const savedPost = await ads.save();
        if (savedPost) {
            res.send({
                "status": "success",
                savedPost
            });
        } else {
            res.status(500).send({
                error: "There is something wrong"
            });
        }
    } catch (err) {
        console.log(`Recieved error in catch ${err}`);
        res.status(500).send({
            error: "There is something wrong"
        })
    }
});

module.exports = router;