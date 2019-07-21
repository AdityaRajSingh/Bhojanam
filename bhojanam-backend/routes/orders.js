const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')

const orderModel= require('../models/orderModel')
const supplierModel= require('../models/supplierModel')

const auth=require('../auth')


router.get('/count',function(req,res)
{
    orderModel.find()
    .select('noOfPerson')
    .exec()
    
    .then(orders=>{
        let countOf=0;
        orders.map(order=>{
            console.log(order);
            countOf+=order.noOfPerson
        })
        return countOf;
    })
    .then((countOf)=>{
        
        res.json(countOf).status(200);
    })
});

router.get('/',function(req,res)
{
    orderModel.find()
    .select('-__v ')
    .populate('supplier','-password -__v')
    .exec()
    
    .then(orders=>{

        res.json(orders).status(200);
    })
});


router.post('/',auth,function(req,res){
const newOrder= new orderModel({
    supplier:req.body.supplier,
    noOfPerson:req.body.noOfPerson,
    time:req.body.time,
    delivery:null, 
    
});

    newOrder.save();

var initialStreak;
    supplierModel.findOne({_id:req.body.supplier})
    .select('streak')
    .exec()
    .then((supplier)=>{
        console.log(supplier);
        initialStreak=supplier.streak;
        supplierModel.findOneAndUpdate({_id:req.body.supplier},{streak:initialStreak+req.body.noOfPerson})
    //.select()
    .exec()
    // .then((supplier)=>{

    // })
    res.json("Order Created").status(201);

    })



    


})


router.get('/:orderID',function(req,res)
{
    const id=req.params.orderID;
    orderModel.findById(id)
    .exec()
    .then(order=>{
        res.json(order).status(200);
    })

})

router.get('/supplier/:supplierID',auth,function(req,res)
{
    const id=req.params.supplierID;
    orderModel.find({supplier:id})
    .populate('delivery','-password -__v')
    .exec()
    .then(orders=>{
            res.json(orders).status(200);  
    })
})

router.get('/delivery/:deliveryID',auth,function(req,res)
{
    const id=req.params.deliveryID;
    console.log(id);
    orderModel.find({delivery:id})
    .populate('supplier','-password -__v')
    .exec()
    .then(orders=>{
        console.log(orders);
            res.json(orders).status(200);  
    })
})

router.put('/:orderID',auth,function(req,res)
{
    const id=req.params.orderID;
    const deliveryID=req.body.deliveryID;
    orderModel.updateOne({_id:id},{$set:{delivery:deliveryID}})
    .exec()
    .then(order=>{
        res.json(order).status(200);
    })

})


module.exports=router;

