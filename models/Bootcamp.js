const moongose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../util/geocoder");

const BootcampSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxLenght: [50, "Name can not be more than 50 characters"],
    },
    slug: String,
    description: {
        type: String,
        required: [true, "Please add a description"],
        maxLenght: [500, "Description can not be more than 500 characters"],
    },
    website: {
        type: String,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            "Please add a valid URL with HTTP or HTTPS"]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    address: {
        type: String,
        required: [true, "Please add an address"],
    },
    location: {
        //GeoJSON Point
        type: {
            type: String,
            enum: ["Point"],
            required: false,
        },
        coordinates: {
            type: [Number],
            required: false,
            index: "2dsphere"
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            "Web Development",
            "Mobile Development",
            "UI/UX",
            "Data Science",
            "Business",
            "Other",
        ]
    },
    averageRating: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [10, "Rating must not be bigger than 10"],
    },
    averageCost: Number,
    photo: {
        type: String,
        default: "no-photo.jpg"
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGuarantee: {
        type: Boolean,
        default: false,
    },
    acceptedGi: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create bootcamp slug from the name
BootcampSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// Geocode and create location field
BootcampSchema.pre("save", async function (next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc[0]);
    this.location = {
        type: "Point",
        // lang, lat
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipCode: loc[0].zipcode,
        country: loc[0].countryCode,
    }

    // Do not save address in DB
    this.address = undefined;
    next();
})


module.exports = moongose.model("Bootcamp", BootcampSchema);