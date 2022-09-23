const express = require('express')
const { Post, User } = require('../models')
const router = express.Router()

router.get('/home', async (req, res, next) => {
    try {
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
        console.log(checkLength)
        res.render("home.html", {
            exPost,
            searchPage,
            checkLength
        })
    } catch (e) {
        console.error(e)
        next(e)
    }
})

module.exports = router