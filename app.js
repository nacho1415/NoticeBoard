const express = require('express')
const path= require('path')
const nunjucks = require('nunjucks')
const port = 3000

const db = require('./models')
const homeRouter = require('./routes/home')

const app = express()
db.sequelize
  .sync(
    // { force: true }
    )
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(express.static('public'));
app.set('view engine', 'nunjucks');
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use('', homeRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})