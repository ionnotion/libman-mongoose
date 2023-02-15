const mongoose = require("mongoose")
let localhost = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const url = process.env.ATLAS_URL || localhost
const options = {
    dbName: `LibManDB`,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.set("strictQuery", true)

async function mongooseConnect() {
    mongoose.connect(url, options).then(()=>{
        console.log("Connected to mongoose!")
    })
}

module.exports = mongooseConnect