require('dotenv').config()

const express = require('express');
const connectToDB = require('./database/db'); 
const bookRoutes = require('./routes/book-routes');
const userRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const imageRoutes = require('./routes/image-routes');
const productRoutes = require('./routes/product-routes');
const authorRoutes = require('./routes/author-routes');

const app = express();
const PORT = process.env.PORT;

//connect to our db
connectToDB();

//Middleware
app.use(express.json());

//routes here
app.use("/api/books", bookRoutes);
app.use("/api/user", userRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/author", authorRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


