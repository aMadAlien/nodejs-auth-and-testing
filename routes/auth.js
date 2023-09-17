const router = require('express').Router();
const bcrypt = require('bcryptjs');
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

    // encrypt password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

// app.use('api/user/login'...
router.post('/login', async (req, res) => {
    // Validate that the body content matches our requirements
    const { error } = DataValidation.loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not registered");

    // encrypt password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send('Invalid password');

    res.status(200).send('logged in');
})

module.exports = router;