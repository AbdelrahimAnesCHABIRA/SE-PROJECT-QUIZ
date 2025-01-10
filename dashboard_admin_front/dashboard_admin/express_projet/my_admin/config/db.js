const mongoose = require("mongoose");
const connectiondb = async() =>{
   try{
        const connections = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("data base connected  : ", connections.connection.host,connections.connection.name);
   }catch(error){
    console.log(error);
    process.exit(1);
   }

};
module.exports = connectiondb;