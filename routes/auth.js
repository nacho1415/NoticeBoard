const express = require('express')
const { Op } = require('sequelize')
const { User, Post } = require('../models')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("../utils/jwt-utils");
const redisClient = require('../utils/redis')
require("dotenv").config();

router.post('/signin', async (req, res, next) => {
    try {
        console.log(req.data)
        if (!req.body.email) {
            return res.status(400).send({ message: "이메일이 전달되지 않았습니다" })
        }
        const exUser = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        
        if (!exUser) {
            return res.status(401).send({ message: "해당 이메일을 가진 유저가 존재하지 않습니다" })
        }
        console.log(req.body.password, exUser.password)
        const chk = await bcrypt.compare(req.body.password, exUser.password);

        if (!chk) {
            return res.status(402).send({ message: "패스워드가 일치하지 않습니다" })
        }
        const accessToken = jwt.sign(exUser);
        const refreshToken = jwt.refresh(exUser);

        redisClient.set(exUser.id, refreshToken);
        return res.json({
            exUser,
            refreshToken,
            accessToken,
        });
    } catch (e) {
        console.error(e)
        next(e)
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        console.log(req.body, "???")
        if (!req.body.signUpEmail) {
            return res.status(400).send({ message: "이메일이 전달되지 않았습니다" })
        }

        const exUser = await User.findOne({
            where: {
                email: req.body.signUpEmail
            }
        })

        if (exUser) {
            return res.status(403).send({ message: "이미 사용중인 아이디 입니다" })
        }

        if (!req.body.signUpPassword) {
            return res.status(401).send({ message: "패스워드가 전달되지 않았습니다" })
        }
        if (!req.body.signUpNickname) {
            return res.status(402).send({ message: "닉네임이 전달되지 않았습니다" })
        }
        const hashedPassword = await bcrypt.hash(req.body.signUpPassword, 10)
        
        await User.create({
            email: req.body.signUpEmail,
            password: hashedPassword,
            nickname: req.body.signUpNickname
        })
        return res.redirect("/home")
    } catch (e) {
        console.error(e)
        next(e)
    }
})

module.exports = router