const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");


// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load modules
const Bootcamp = require("./models/Bootcamp");
mongoose.connect(process.env.MONGO_URI, {
    // This configuration allow us to avoid further console messages
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8"));

// Import into DB
const importData = async ()=> {
    try {
        await Bootcamp.create(bootcamps);

        console.log("Data imported".green.inverse);
        process.exit();
    } catch (e) {
        console.error(e);
    }
}

// Delete data

const deleteData = async ()=> {
    try {
        // It deletes all the bootcamps 
        // from my DB
        await Bootcamp.deleteMany();

        console.log("Data destroyed".red.inverse);
        process.exit();
    } catch (e) {
        console.error(e);
    }
}

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}