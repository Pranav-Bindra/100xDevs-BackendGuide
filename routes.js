// Here we write everything related to express

const express = require('express');
const { z } = require('zod');
const { mongoose } = require('mongoose');
const { User } = require('./db');
const { UserAuthenticator, updateBody } = require('./authentication');
const jwt = require('jsonwebtoken');
const SECRET = 'pranavsecret'

const app = express();

app.use(express.json());

// POST ROUTES

app.post('/users/add', async function (req, res) {
    const { success } = UserAuthenticator.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            message: 'Invalid inputs'
        })
    }

    const authToken = req.headers.authorization;

    const existingUser = await User.findOne({
        username: req.body.username
    })


    if (existingUser) {
        return res.status(411).json({
            message: 'User already exists'
        })
    }

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userId = newUser._id;
    console.log(userId);

    const token = jwt.sign({
        userId
    }, SECRET)


    res.json({
        message: 'User Created',
        token: token
    })
})


// GET ROUTES
app.get('/users', async function (req, res) {
    const filter = req.query.filter

    if (filter) {
        usersFiltered = await User.find({
            firstName: filter
        })
    }
    else {
        usersFiltered = await User.find({})
    }

    res.json({
        users: usersFiltered
    })
})


// PUT ROUTES
app.put('/users/update', async function (req, res) {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({ username: req.body.username }, req.body);

    res.json({
        message: 'User updated succesfully'
    })

})

// DELETE ROUTES
app.delete('/users/delete', async function (req, res) {
    const filter = req.query.filter

    await User.deleteOne({
        username: filter
    })

    res.json({
        message: 'User deleted'
    })
})


app.listen(3000)