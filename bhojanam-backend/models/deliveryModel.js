const mongoose= require('mongoose');
const deliverySchema= mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your data entry, no name specified!"]
    },
    photo:{
        type:String
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
});

module.exports=mongoose.model('Delivery',deliverySchema);
