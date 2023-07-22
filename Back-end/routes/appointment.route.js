const express = require("express");
const mongoose = express("mongoose")
const { AppointmentModel } = require("../model/appointment.model");
const appointRoute = express.Router();

appointRoute.post("/", async (req, res) => {
    try {
        let lawyerId = req.body.lawyerId;
        const isLawyer = await AppointmentModel.findOne({ lawyerId: lawyerId });
        if (isLawyer) {
            const { address, clientId, date, details, email, name, phone, subject, time } = req.body


            await AppointmentModel.updateOne({ lawyerId: lawyerId }, { $push: { appointments: { address, clientId, date, details, email, name, phone, subject, time } } })
            return res.status(201).send({
                status: true,
                message: "One appointment has been scheduled !"
            })

        }

        const { address, clientId, date, details, email, name, phone, subject, time } = req.body
        const appointment = { lawyerId: lawyerId, appointments: [{ address, clientId, date, details, email, name, phone, subject, time }] }

        const appoint = await AppointmentModel(appointment)
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

//  perticulaar appointment 

appointRoute.get("/:id", async (req, res) => {
    try {
        const appoint = await AppointmentModel.findOne({ lawyerId: req.params.id })
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


//  this will delete the all appointments one perticular lawyer
appointRoute.delete("/:id", async (req, res) => {
    try {
        await AppointmentModel.deleteOne({ lawyerId: req.params.id })
        res.status(202).send({
            status: true,
            message: "One appointment has been deleted !"
        })

    } catch (err) {
        res.status(204).send({
            status: false,
            message: "Bad request !"
        })
    }
})

//  Client is deleting  individual appointment
appointRoute.delete("/client/:lawyerId/:id", async (req, res) => {
    try {
        const { id, lawyerId } = req.params
        await AppointmentModel.updateOne({ lawyerId: lawyerId }, { $pull: { "appointments": { _id: id } } })
        res.status(202).send({
            status: true,
            message: "One appointment has been deleted !"
        })

    } catch (err) {
        res.status(204).send({
            status: false,
            message: "Bad request !"
        })
    }
})
module.exports = { appointRoute }
