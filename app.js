const express = require('express');
const app = express();
const users = require('./routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/apiMongooseExpressTest');

//Middlewares
app.use(bodyParser.json());
//Routes
app.use('/users', users);
//Catch erorrs and forward them to the error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});
//Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //Response to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    //Response to dev
    console.log(err);    
});
//Start the server

const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening the ${port} port`));