const express = require('express')
const { Post, User, Comment } = require('../models')
const router = express.Router()
const authJWT = require("../utils/authJWT.js")

router.get('/home', async (req, res, next) => {
    try {
        console.log(req.json)
        console.log("???")
        const page = req.query.page ? (req.query.page-1) * 15 : 0
        console.log(req.query, page)
        const exPost = await Post.findAll({
            
            include: {
                model: User
            },
            limit: 15,
            offset: page
        })

        searchPage = parseInt(page / 150)
        let checkLength = await Post.findAll({
            limit: 150,
            offset: 150 * searchPage
        })
        checkLength = Math.ceil(checkLength.length / 15)+1
        const exUserList = []
        for (i = 0; i < exPost.length; i++) {
            exUserList.push(await User.findOne({
                where: {
                    id: exPost[i].UserId
                }
            }))
        }
        console.log(searchPage, page)
        console.log(checkLength)
        res.render("home.html",  {
            exPost,
            searchPage,
            checkLength,
            page
        })
    } catch (e) {
        console.error(e)
        next(e)
    }
})

router.get('/home/:page', async (req, res, next) => {
    try {
        if (!req.params.page) {
            return res.status(400).send({ message: "page query가 전달되지 않았습니다" })
        }
        console.log(req.params.page, "???????????????")
        const exPost = await Post.findOne({
            where: {
                id: req.params.page
            },
            include: [
                {
                    model: User
                }, 
                {
                    model: Comment,
                    as: "thisComments"
                }
            ]
        })
        console.log(exPost.thisComments[1])
        // const exComment = await exPost.getThisComments()
        // console.log(exComment, "???")
        console.log("성공")
        res.render("detail.html", {
            exPost,
            "asd": "check"
        })
    } catch (e) {
        console.error(e)
        next(e)
    }
})

router.post('/home/createComment', authJWT, async (req, res, next) => {
    try {
        console.log(req.body)
        console.log(req.headers)
        // if (!req.body.postId) {
        //     return res.status(400).send({ message: "postId 가 지급되지 않았습니다" })
        // }

        // if (req.body.comment) {
        //     return res.status(402).send({ message: "comment 가 지급되지 않았습니다"})
        // }
        console.log(req.myId)
        const Commenter = await User.findOne({
            where: {
                id: req.myId
            }
        }) 
        // console.log(req.id, "??")
        await Comment.create({
            content: req.body.content,
            PostId: req.body.postId,
            UserId: req.myId,
            CommentId: req.body.commentId
        })

        // await Commenter.addMyComment(
        //     content: "dassd",
        //     PostId: "dasd",
        //     CommentId: null
        // )
        res.status(200).send({ success: true })
    } catch (e) {
        console.error(e)
        next(e)
    }
})


module.exports = router