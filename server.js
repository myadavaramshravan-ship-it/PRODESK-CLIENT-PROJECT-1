const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/appointments", appointmentRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Car Wash Appointment API Running"
    });
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});