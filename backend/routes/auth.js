const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
//Post request for creating user
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    //If any error send bad request with error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry user with this email already exists" })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        // .then(usr=>res.json(usr))
        // .catch(err=>{console.log(err)
        //     res.json({error : 'please enter unique email', msg : err.message})
        //});
        // const user = User(req.body);
        // user.save();
        //res.send(req.body);
        res.json(user);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})

module.exports = router;