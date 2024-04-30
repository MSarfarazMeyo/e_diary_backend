const express = require("express");
require("dotenv").config();
require("./config/database");
const cors = require("cors");
const path = require("path");

const adminRouter = require("./routes/admin");
const classesRouter = require("./routes/classes");
const e_dairyRouter = require("./routes/e_dairy");
const parentRouter = require("./routes/parent");
const studentRouter = require("./routes/student");
const teachersRouter = require("./routes/teachers");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/admin", adminRouter);
app.use("/admin/class", classesRouter);
app.use("/admin/teacher", teachersRouter);
app.use("/admin/student", studentRouter);
app.use("/admin/parent", parentRouter);
app.use("/edairy", e_dairyRouter);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
