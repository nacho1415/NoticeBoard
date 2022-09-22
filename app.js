const express = require('express')
const app = express()
const port = 3000

const homeRouter = require('./routes/home')


app.use('', homeRouter)

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('500', { error: err });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})