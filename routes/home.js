const express = require('express')
const router = express.Router()

router.get('/',(req, res, next) => {
    try {
        console.log("hello")
        res.send( "hello" )
    } catch (e) {
        console.error(e)
        next(e)
    }
})

module.exports = router