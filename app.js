// app.js
const app = require('./src/config/express');
const allRoutes = require('./src/routes/index');
const databaseConfig = require('./src/config/database'); //Dont Remove
const dotenv = require('dotenv');
const { setStoreIdFromHeader } = require('./src/middlewares/multyTenancy');
// var moment = require('moment');
dotenv.config();




////For Test
// const date = moment().format('MMMM Do YYYY, h:mm:ss a')
// console.log(date)
app.get('/', (req, res) => {
    res.send('Hello, Express',);

});

app.use((req, res, next) => {
    console.log("HTTP Method", req.method, "URL", `http://localhost:5000${req.url}`,)
    next()
})

app.use(setStoreIdFromHeader);

// Use routes 
app.use('/api/v1/', allRoutes);

module.exports = app;
