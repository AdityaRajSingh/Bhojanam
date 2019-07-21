const mongoose= require('mongoose');

const supplierSchema= mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your data entry, no name specified!"]
    },
    photo:{
        type:String
    },
    email: {
        type: String,
        required: [true, "please enter your data entry, no email specified!"],
        unique:true
    },
    mobile: {
        type: String,
        required: [true, "please enter your data entry, no mobile specified!"],
        unique:true
    },
    password: {
        type: String,
        required: [true, "please enter your data entry, no password specified!"]
    },
    address: {
        type: String,
        required: [true, "please enter your data entry, no address specified!"]
    },
    streak:{
        type: Number,
    }

});

module.exports=mongoose.model('Supplier',supplierSchema);
