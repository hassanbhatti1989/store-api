const Product = require('../models/productsModel');
const getAllProductsStatic = async (req, res) => {
    // throw new Error('testing async error')
    const products = await Product.find({name: 'vase table'})
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res) => {
    try{
        // res.status(200).json({msg:'hellp this is get all not statics'});
        // console.log(req.query)
        const { featured, company, name, sort, fields, numericFilters } = req.query;
        const queryObj = {};
        if(featured){
            queryObj.featured = featured === 'true' ? true : false
        }
        if(company){
            queryObj.company = company
        }
        if(name){
            queryObj.name = { $regex: name, $options: 'i' }
        }
        // numeric filters
        if(numericFilters){
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            }
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`)
            const options = ['price', 'rating']
            filters = filters.split(',').forEach((element) => {
                const [field, operator, value] = element.split('-');
                if(options.includes(field)){
                    queryObj[field] = {[operator]: Number(value)}
                }
            });
        }
        let result = Product.find(queryObj);
        // sort
        if(sort){
            result = result.sort(sort)
        }else{
            result = result.sort('createdAt');
        }
        // fields selection
        if(fields){
            const fieldsList = fields.split(',').join(' ');
            result = result.select(fieldsList)
        }
        // pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page -1) * limit
        
        const products = await result
        res.status(200).json({products, nbHits: products.length});
    }catch(err){
        console.log('error');
    }
}

module.exports = { getAllProductsStatic,  getAllProducts}