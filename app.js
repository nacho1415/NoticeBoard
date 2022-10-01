const express = require('express')
const path= require('path')
const nunjucks = require('nunjucks')
const port = 3000
const bodyParser = require('body-parser')
const scriptTag = require("nunjucks-script-tag");

const db = require('./models')
const homeRouter = require('./routes/home')
const authRouter = require('./routes/auth')

const app = express()
db.sequelize
  .sync(
    // { force: true }
    )
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
env = nunjucks.configure('views', {
  express: app
});
scriptTag.configure(env);

app.use('', homeRouter)
app.use('/api/auth', authRouter)

app.use(function (error, req, res, next) {
  res.json({ message: error.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})