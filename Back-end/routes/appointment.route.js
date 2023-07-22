const express = require("express");
const { AppointmentModel } = require("../model/appointment.model");
const appointRoute = express.Router();

appointRoute.post("/", async (req, res) => {
    try {

        const appoint = await AppointmentModel(req.body)
        appoint.save()
        res.status(201).send({
            status: true,
            message: "One appointment has been scheduled !"
        })

    } catch (err) {
        res.status(501).send({
            status: false,
            message: "Not Created !"
        })
    }
})


//  Get All the appointments
appointRoute.get("/", async (req, res) => {
    try {

        const appoint = await AppointmentModel.find()
        res.status(201).send({
            status: true,
            data: appoint
        })

    } catch (err) {
        res.status(400).send({
            status: false,
            message: "Bad request !"
        })
    }
})

module.exports = { appointRoute }
