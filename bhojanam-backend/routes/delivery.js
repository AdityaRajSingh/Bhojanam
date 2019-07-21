const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')
const bcryptjs = require('bcryptjs');
const deliveryModel= require('../models/deliveryModel')
const jwt=require('jsonwebtoken');


const auth=require('../auth')
const multer=require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: fileFilter
  });
  




router.get('/',function(req,res)
{
    res.send("Delivery Home").status(200);
});


var str="https://bhojanam-backend.herokuapp.com/"
router.post('/',upload.single('photo'), function (req, res)
 {
    const newDelivery = new deliveryModel({
        name: req.body.name,
        mobile: req.body.mobile,
        password: bcryptjs.hashSync(req.body.password, 10),
        address: req.body.address,
        photo: str+req.file.path
    })


    deliveryModel.find({ mobile: req.body.mobile })
        .exec()
        .then(delivery => 
            {
            if (delivery.length > 0) {
                res.send("Delivery User already exixts").status(400);
            }
            else {
                newDelivery.save();
                res.send("Delivery User Created Successfully").status(201);
            }
        })
});


router.post('/signin',function(req,res){
    deliveryModel.findOne({mobile:req.body.mobile})
    .exec()
    .then(delivery=>{
        if(delivery==null)
        {
            
            
            res.send("Auth failed").status(401);
        }
        else{
           if(bcryptjs.compareSync(req.body.password,delivery.password))
           {
               //using synchronous function
               const token=jwt.sign(
                {
                    mobile:delivery.mobile,
                    _id:delivery._id
            },
            'qwertyu',{
                expiresIn: '12h'
            }
            );


               res.json({
                   "message":"Auth Successfull",
                   "token":token,
                   "deliveryID":delivery._id
                   }).status(200);
               
           }
           else{
            res.send("Auth failed").status(401);
           }
        }
    })
});


router.get('/:deliveryID',auth,function(req,res)
{
    const id=req.params.deliveryID;
    deliveryModel.findById(id)
    .exec()
    .then(delivery=>{
        res.json(delivery).status(200);
    })

})


module.exports=router;

