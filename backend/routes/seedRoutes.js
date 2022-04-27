import express from "express";
import product from "../models/ProductModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
import userData from "../userData.js";

const seedRouter = express.Router()

seedRouter.get('/products', async (req, res) => {
    await product.remove({})
    const products = await product.insertMany(data);
    res.send(products)
})

seedRouter.get('/users', async (req, res) => {
    await User.remove({})
    const user = await User.insertMany(userData);
    res.send(user)
})

export default seedRouter