require('dotenv').config();

const connectDB = require('./db/connection');
const Product = require('./models/productsModel')

const jsonProducts = require('./products.json');

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        process.exit(0)
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

start();