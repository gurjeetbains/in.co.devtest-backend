const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const Users = require('../models/Users');
const userCheck = require('../checks/userCheck');
const loginCheck = require('../checks/loginCheck');
const passport = require('passport');
const config = require('../config');
const validator = require('validator');

router.post('/validate', passport.authenticate('auth-token', {
    session: false
}), async (req, res) => {
    const id = req.user._id;
    res.send({
        validToken: true,
        userid: id
    });
});
router.post('/register', async (req, res) => {
    try {
        const errors = userCheck(req);
        if (Object.keys(errors).length) {
            return res.status(500).json(errors);
        }
        const name = validator.trim(req.body.name);
        const email = validator.trim(req.body.email);
        const password = validator.trim(req.body.password);
        const company = validator.trim(req.body.company);
        const address = validator.trim(req.body.address);
        // check if user exist
        const user = await Users.findOne({
            email: email
        });
        if (user) {
            errors.email = "This email is already exist";
            return res.status(500).send(errors);
        } else {
            // for create a new entry in database table users
            const user = new Users({
                email: email,
                name: name,
                password: password,
                company: company,
                address: address
            });
            bcrypt.hash(password, 8, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    return res.status(500).send({
                        error: "There is something wrong"
                    });
                }
                user.password = hash;
                const savedUser = await user.save();
                if (savedUser) {
                    res.send({
                        "status": "success",
                        savedUser
                    })
                } else {
                    res.status(500).send({
                        error: "There is something wrong"
                    })
                }
            });
        }
    } catch (err) {
        console.log(`Recieved error in catch ${err}`);
        res.status(500).send({
            error: "There is something wrong"
        })
    }
});
router.get('/user', passport.authenticate('auth-token', {
    session: false
}), async (req, res) => {
    try {
        const id = req.user._id;
        const user = await Users.findById(id);
        res.json(user);
    } catch (err) {
        console.log(`Recieved error in catch ${err}`);
        res.status(500).send({
            error: "There is something wrong"
        })
    }
});
router.post('/login', async (req, res) => {
    try {
        const errors = loginCheck(req);
        if (Object.keys(errors).length) {
            return res.status(500).json(errors);
        }
        let email = req.body.email;
        let password = req.body.password;
        let user = await Users.findOne({
            email: email
        });
        if (user === null) {
            return res.status(500).send({
                emailError: "Email doesnot exist"
            })
        }
        bcrypt.compare(password, user.password, async (err, found) => {
            if (err) {
                return res.sendStatus(500).json({
                    error: "There is something wrong"
                });
            }
            if (found) {
                //generate token here
                const token = await JWT.sign({
                        email: user.email,
                        name: user.name,
                        _id: user._id
                    },
                    config.SecretKey, {
                        expiresIn: 60 * 60
                    }
                )
                // Login code here
                return res.send({
                    "success": true,
                    "userid": user._id,
                    "token": "Bearer " + token
                });
            } else {
                return res.status(500).send({
                    emailError: "Invalid Password"
                });
            }
        })
    } catch (err) {
        console.log(`Recieved error in catch ${err}`);
        res.status(500).send({
            error: "There is something wrong"
        })
    }
});

module.exports = router;