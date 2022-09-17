const mongoose = require("mongoose");

module.exports.connect = () => {
    mongoose.connect(process.env.DB,{useNewUrlParser: true, useUnifiedTopology: true } ,(err) => {
        if(err) throw err;
        console.log("Database Connected!")
    })
}