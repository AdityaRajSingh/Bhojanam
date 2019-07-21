const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const mongoose = require('mongoose');
const supplierModel = require('../models/supplierModel');

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
  






router.get('/', function (req, res) {
    res.send("Supplier's home").status(200);
});

var str="https://bhojanam-backend.herokuapp.com/"
router.post('/',upload.single('photo'), function (req, res)
 {
    const newSupplier = new supplierModel({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: bcryptjs.hashSync(req.body.password, 10),
        address: req.body.address,
        streak: 0,
        photo: str+req.file.path
    })


    supplierModel.find({ mobile: req.body.mobile })
        .exec()
        .then(suppliers => 
            {
            if (suppliers.length > 0) {
                res.send("User already exixts").status(400);
            }
            else {
                newSupplier.save();
                res.send("User Created Successfully").status(201);
            }
        })
});


router.post('/signin',function(req,res){
    supplierModel.findOne({mobile:req.body.mobile})
    .exec()
    .then(supplier=>{
        if(supplier==null)
        {
            
            
            res.send("Auth failed").status(401);
        }
        else{
           if(bcryptjs.compareSync(req.body.password,supplier.password))
           {
               //using synchronous function
               const token=jwt.sign(
                {
                    mobile:supplier.mobile,
                    _id:supplier._id
            },
            'qwertyu',{
                expiresIn: '12h'
            }
            );


               res.json({
                   "message":"Auth Successfull",
                   "token":token,
                   "supplierID":supplier._id
                   }).status(200);
               
           }
           else{
            res.send("Auth failed").status(401);
           }
        }
    })
});


router.get('/:supplierID',auth,function(req,res)
{
    const id=req.params.supplierID;
    supplierModel.findById(id)
    .exec()
    .then(supplier=>{
        res.json(supplier).status(200);
    })

})

module.exports = router;