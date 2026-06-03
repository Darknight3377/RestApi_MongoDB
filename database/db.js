const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config()

dns.setServers(['8.8.8.8', '8.8.4.4']) // to setup my wifi dns to google dns
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('database connected successfully');
    } catch(e) {
        console.error('Mongo db connection failed', e);
        process.exit();
    }
}

module.exports = connectToDB;