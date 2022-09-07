//categories
const model= require('../models/model');

async function create_category(req,res){
    const Create= new model.Categories({
        type: "Investment",
        color: '#FCBE44', //DARK
    })

     await Create.save(function(err){
        if(!err) return res.json(Create);
        return res.status(400).json({message:`Error while creating categories ${err}`});

    });
    
}
async function get_Categories(req,res){
    let data= await model.Categories.find({})

    let filter= await data.map(v=> Object.assign({},{type:v.type, color:v.color}));

    return res.json(filter);
}


async function create_Transaction(req,res){
    if(!req.body)return res.status(400).json("post http data not provided");
    let {name,type,amount}=req.body;
    
    const create= await new model.Transaction({
        name,
        type,
        amount,
        date: new Date()
    });
    create.save(function(err){
        if(!err)return res.json(create);
        return res.status(400).json({message: `error  while creating transaction ${err}`});
    });
} 


async function get_Transaction(req,res){
    let data= await model.Transaction.find({});
    return res.json(data);
}


//delete 
async function delete_Transaction(req,res){
    if(!req.body)res.status(400).json({message:"body not found"});
    await model.Transaction.deleteOne(req.body,function(err){
        if(!err)res.json("record deleted...!");

    }).clone().catch(function(err){res.json("error while deleting record")});

}
//labels pe get request
async function get_Labels(req, res){

    model.Transaction.aggregate([
        {
            $lookup : {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Looup Collection Error");
    })

}


module.exports = {
    create_category,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}
