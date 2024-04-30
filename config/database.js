const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database Connected : ${process.env.DATABASE_URI}`);
  })
  .catch((err) => {
    console.error("Database Connection Error", err);
  });

// const mongoose = require("mongoose");

// const dbUrl = "mongodb://localhost:27017/my_database"; // Replace 'my_database' with your preferred database name.

// mongoose
//   .connect(process.env.DATABASE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.error("MongoDB connection error:", error));
