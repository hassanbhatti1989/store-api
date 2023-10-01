require('dotenv').config();
// async errors
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connection')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const productsRouter = require('./routes/routes')
// middleware
app.use(express.json());



//routes
app.get('/', (req, res)=>{
    res.send('<h1>Store api</h1><a href="/api/v1/products">oroducts routes</a>');
})
app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;
const url = process.env.MONGO_URI;
const start = async () => {
    try{
        await connectDB(url);
        app.listen(port, ()=>{
            console.log(`server is listening on ${port} ...`)
        })
    }catch(e){
        console.log(e);
    }
}

start();