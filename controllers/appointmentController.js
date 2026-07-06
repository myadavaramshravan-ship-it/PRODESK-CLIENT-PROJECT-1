const sanitizeHtml = require("sanitize-html");

const { logAnalytics } = require("../utils/analytics");

let appointments = [];

exports.getAppointments = (req, res) => {

    if (appointments.length === 0) {

        return res.json({
            success: true,
            message: "No data found",
            data: []
        });

    }

    res.json({
        success: true,
        data: appointments
    });

};
exports.getAppointment = (req, res) => {

    const appointment = appointments.find(
        item => item.id == req.params.id
    );

    if (!appointment) {

        return res.status(404).json({
            success: false,
            message: "Appointment not found"
        });

    }

    res.json({
        success: true,
        data: appointment
    });

};
exports.createAppointment = (req, res) => {

    const customerName = sanitizeHtml(req.body.customerName || "", {
        allowedTags: [],
        allowedAttributes: {}
    });

    const vehicle = sanitizeHtml(req.body.vehicle || "", {
        allowedTags: [],
        allowedAttributes: {}
    });

    if (!customerName || !vehicle) {

        return res.status(400).json({
            success: false,
            message: "Validation Failed"
        });

    }

    const appointment = {
        id: Date.now(),
        customerName,
        vehicle,
        service: req.body.service,
        appointmentTime: req.body.appointmentTime
    };

    appointments.push(appointment);
    logAnalytics();
    res.status(201).json({
        success: true,
        message: "Appointment Created",
        data: appointment
    });
};

exports.updateAppointment = (req, res) => {
    const id = Number(req.params.id);
    const appointment = appointments.find(
        item => item.id === id
    );
    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: "Appointment not found"
        });
    }

    appointment.customerName = sanitizeHtml(req.body.customerName || "", {
        allowedTags: [],
        allowedAttributes: {}
    });

    appointment.vehicle = sanitizeHtml(req.body.vehicle || "", {
        allowedTags: [],
        allowedAttributes: {}
    });

    appointment.service = req.body.service;
    appointment.appointmentTime = req.body.appointmentTime;
    logAnalytics();

    res.json({
        success: true,
        message: "Appointment updated successfully",
        data: appointment
    });

};

exports.deleteAppointment = (req, res) => {
    const id = Number(req.params.id);
    const index = appointments.findIndex(
        appointment => appointment.id === id
    );
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Appointment not found"
        });
    }
    appointments.splice(index, 1);
    console.log("[Analytics] User interacted with Express API");
    res.json({
        success: true,
        message: "Appointment deleted successfully"
    });

};