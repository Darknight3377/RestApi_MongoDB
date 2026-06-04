const mongoose = require("mongoose");
const Product = require("../models/product");

const sampleProducts = [
    {
        name: 'Laptop',
        category: 'Electronics',
        price: 2000,
        inStock: true,
        tags: ["Computer", "Tech"]
    },
    {
        name: 'Smartphone',
        category: 'Electronics',
        price: 1000,
        inStock: true,
        tags: ["Mobile", "Tech"]
    },
    {
        name: 'Headphones',
        category: 'Electronics',
        price: 300,
        inStock: false,
        tags: ["audio", "Tech"]
    },
    {
        name: 'Running Shoes',
        category: 'Sports',
        price: 99,
        inStock: true,
        tags: ["footwear", "Tech"]
    },
    {
        name: 'Novel',
        category: 'Books',
        price: 95,
        inStock: true,
        tags: ["fiction", "story"]
    }
];
const addProducts = async (req, res) => {
    try {
        const result = await Product.insertMany(sampleProducts);
        return res.status(201).json({
            success: true,
            data: `Inserted ${result.length} products`
        })
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong, ${e}`
        })
    }
}

const getProductStats = async (req, res) => {
    try {
        const result = await Product.aggregate([
            //instock true and price >= 100
            {
                $match : {
                    inStock: true,
                    price: {
                        $gte : 100
                    }
                }
            }, 
            //group by category and calc avg practice
            {
                $group: {
                    _id : "$category",
                    avgPrice: {
                        $avg: "$price"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ])
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong, ${e}`
        })
    }
}

const getProductAnalysis =  async (req, res) => {
    try {
        const result = await Product.aggregate([
            //instock true and price >= 100
            {
                $match : {
                    category: 'Electronics'
                }
            },
            {
                $group : {
                    _id: null,
                    totalRevenue: {
                        $sum: "$price"
                    },
                    avgPrice : {
                        $avg: "$price"
                    },
                    maxPrice : {
                        $max: "$price"
                    },
                    minPrice : {
                        $min: "$price"
                    },
                }
            },
            {
                $project: {
                    _id : 0,
                    totalRevenue: 1,
                    avgPrice: 1,
                    maxPrice: 1,
                    minPrice: 1,
                    priceRange: {
                        $subtract: ["$maxPrice", "$minPrice"]
                    }
                }
            }

        ])
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong, ${e}`
        })
    }
}

module.exports = { addProducts, getProductStats , getProductAnalysis }