require('dotenv').config()

const express = require('express');
const connectToDB = require('./database/db'); 
const bookRoutes = require('./routes/book-routes');

const app = express();
const PORT = process.env.PORT;

//connect to our db
connectToDB();

//Middleware
app.use(express.json());

//routes here
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


