const express = require("express");
const mongoose = express("mongoose")
const nodemailer = require("nodemailer")

const { AppointmentModel } = require("../model/appointment.model");
const appointRoute = express.Router();

appointRoute.post("/", async (req, res) => {
    try {
        let lawyerId = req.body.lawyerId;
        const isLawyer = await AppointmentModel.findOne({ lawyerId: lawyerId });
        console.log(isLawyer)
        if (isLawyer) {
            const { address, clientId, date, details, email, name, phone, subject, time } = req.body


            await AppointmentModel.updateOne({ lawyerId: lawyerId }, { $push: { appointments: { address, clientId, date, details, email, name, phone, subject, time } } })

            if (time < "12:00") {
                time = time + "am"
            }
            else {
                time = time + "pm"
            }
            main(subject, details, time, date, name, email)
            return res.status(201).send({
                status: true,
                message: "One appointment has been scheduled !"
            })

        }

        const { address, clientId, date, details, email, name, phone, subject, time } = req.body
        const appointment = { lawyerId: lawyerId, appointments: [{ address, clientId, date, details, email, name, phone, subject, time }] }

        const appoint = await AppointmentModel(appointment)
        appoint.save(isLawyer)
        //  Nodemailer 
        if (time < "12:00") {
            time = time + "am"
        }
        else {
            time = time + "pm"
        }
        main(subject, details, time, date, name, email)

        return res.status(201).send({
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
appointRoute.delete("/:lawyerId/:id", async (req, res) => {
    try {
        const { id, lawyerId } = req.params
        await AppointmentModel.updateOne({ lawyerId: lawyerId }, { $pull: { "appointments": { clientId: id } } })
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

//  Nodemails ---------------->>>>>>>>>>>>>;
async function main(subject, details, time, date, name, email) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'pk33360@gmail.com', // generated ethereal user
            pass: 'wiolorlcanwdapvo', // generated ethereal password
        },
    });

    // send mail with defined transport object

    let info = await transporter.sendMail({
        from: 'pk33360@gmail.com', // sender address
        to: `pkthapliyal101@gmail.com`, // list of receivers
        subject: `Appointment regarding ${subject}`, // Subject line
        // text: `Hello ${name}\n Your OTP: ${OTP}\n This OTP will expire in 60 sec.`, // plain text body
        html: `<p> Hello <b> ${name}</b> </p><br/>
        <p>This is an auto-generated email from Legal Guidance. We want to infrom you that your appointment has been confirmed throught Legal Guidance regarding the subject mentioned.</p> <br/>
        <p>Meeting Details : Time : ${time} , <b>${date}</b></p><br/>
         <p><b>Regards, </b></p><br/>
          <p><b>Legal Guidance</b></p><br/>
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
main("Claim", "details", "12:00 pm", "2023/07/25", "Pankaj Thapliyal", "pkthapliyal101@gmail.com")
module.exports = { appointRoute }
