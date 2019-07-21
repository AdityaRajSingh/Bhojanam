const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({

  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true
  },
  noOfPerson: {
    type: Number,
    default: 1
  },
  time: {
    type: String,
    default: "20:00"
  },
  delivery:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery"
  }
});
module.exports = mongoose.model("Order", orderSchema);
