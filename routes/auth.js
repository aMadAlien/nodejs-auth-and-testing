const router = require('express').Router();
const User = require('../models/User');
const { DataValidation } = require('../DataValidation');

// app.use('api/user/register'...
router.post('/register', async (req, res) => {
    // Validate that the body content matches our requirements
    const { error } = DataValidation.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check to make sure that the user doesn't exist
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email already registered")
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;