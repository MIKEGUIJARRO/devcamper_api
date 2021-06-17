const moongose = require("mongoose");

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
            enum: ["point"],
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

module.exports = moongose.model("Bootcamp", BootcampSchema);