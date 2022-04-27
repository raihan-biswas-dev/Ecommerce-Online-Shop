import mongooes from 'mongoose';


const productSchema = new mongooes.Schema({

    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    numberOfRating: {
        type: Number,
        required: true,
    },
    stoke: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },

    brand: {
        type: String,
        required: true,
    },

    coupon: {
        type: String,
    },
    discount: {
        type: Number,
    },
    discountLimit: {
        type: Number,
    },
    totalSell: {
        type: Number,
    },

},
    {
        timestamps: true,
    }
)

const product = mongooes.model('product', productSchema)

export default product