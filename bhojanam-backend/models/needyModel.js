const mongoose= require('mongoose');

const needySchema= mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "please enter your data entry, no name specified!"]
    },
    aadhar: {
        type: String,
        required: [true, "please enter your data entry, no aadhar specified!"],
        unique:true
    },
    noOfPerson: {
        type: Number,
        default: 1
    },
    time: {
        type: Number,
        required: [true, "please enter your data entry, no time specified!"]
    }

});

module.exports=mongoose.model('Needy',needySchema);
