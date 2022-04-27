import express from "express";
import data from "./data.js";
import discount from "./discount.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express()

dotenv.config()




mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("mongodb connected")
}).catch((err) => {
    console.log(err)
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// backend start after done frontend date 24 April class video num 25 write data in database========

app.use('/api/seed', seedRouter)
app.use('/products', productRouter)
app.use('/api/users', userRouter)



// backend start after done frontend date 24 April class video num 25 write data in database========


/*
// 000000


app.get('/products', function (req, res) {
    res.send(data)
})



app.get('/products/:slug', function (req, res) {

    let product = data.find((item) => {

        if (req.params.slug == item.slug) {
            return item
        }
    })

    res.send(product)
})

*/

// =================================================================================


app.get('/category/:cat', function (req, res) {

    let categoryArr = []
    data.find((item) => {

        if (req.params.cat == item.category) {
            categoryArr.push(item)
        }
    })

    res.send(categoryArr)
})




// ======================================================================================


app.get('/discount', function (req, res) {
    res.send(discount)
})

app.get('/cartproduct/:id', function (req, res) {

    let product = data.find((item) => {

        if (req.params.id == item._id) {
            return item
        }
    })

    res.send(product)
})



let port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("I am From port 8000")
})