const getAllProductsStatic = async (req, res) => {
    try{
        // await res.status(200).json({ msg: 'all products Static' });
        res.status(200).json({msg:'hellp this is get all statics'});
    }catch(err){
        console.log('error on static');
    }
}

const getAllProducts = async (req, res) => {
    try{
        // res.status(200).json({msg:'hellp this is get all not statics'});
        res.status(200).json({ msg: 'all product' });
    }catch(err){
        console.log('error');
    }
}

module.exports = { getAllProductsStatic,  getAllProducts}