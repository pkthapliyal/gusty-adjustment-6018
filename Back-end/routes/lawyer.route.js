const express = require("express");
const { auth } = require("../middleware/authenticate");
const { LawyerModel } = require("../model/lawyer.model");
const { UserModel } = require("../model/user.model");
const lawyerRoute = express.Router();

lawyerRoute.post("/add", auth, async (req, res) => {
  try {
    const { location, specialization, practiceAreas, image, description } =
      req.body;

    const userId = req.userId;
    const user = await UserModel.findById(req.userId);
    console.log(user);

    const newLawyer = new LawyerModel({
      userId,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isVerified: user.isVerified,
      location,
      specialization,
      practiceAreas,
      image,
      description,
    });
    await newLawyer.save();
    res.status(200).send(newLawyer);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

//  All lawyers with profile
lawyerRoute.get("/", async (req, res) => {
  const { id } = req.query;
  if (id) {
    const lawyer = await LawyerModel.findOne({ _id: id });
  }
  let laywers = await LawyerModel.find();
  res.status(200).send(laywers);
});

lawyerRoute.get("/:id", auth, async (req, res) => {
  try {
    const lawyer = await LawyerModel.findById(req.params.id).exec();
    if (!lawyer) {
      return res.status(404).json({ error: "Lawyer not found" });
    }
    res.status(200).json(lawyer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

lawyerRoute.get("/find-id", auth, async (req, res) => {
  try {
    const userId = req.userId;

    // Find the lawyer based on the userId
    const lawyer = await LawyerModel.findOne({ lawyerId: userId }).exec();

    if (!lawyer) {
      return res.status(404).json({ error: "Lawyer not found" });
    }

    res.status(200).json({ lawyerId: lawyer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

lawyerRoute.put("/:id", auth, async (req, res) => {
  try {
    const {
      location,
      specialization,
      slots,
      practiceAreas,
      image,
      description,
    } = req.body;
    const updatedLawyer = await LawyerModel.findByIdAndUpdate(
      req.params.id,
      {
        location,
        specialization,
        slots,
        practiceAreas,
        image,
      },
      { new: true }
    ).exec();

    if (!updatedLawyer) {
      return res.status(404).json({ error: "Lawyer not found" });
    }

    res.status(200).json(updatedLawyer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

lawyerRoute.delete("/:id", auth, async (req, res) => {
  try {
    const deletedLawyer = await LawyerModel.findByIdAndDelete(
      req.params.id
    ).exec();

    if (!deletedLawyer) {
      return res.status(404).json({ error: "Lawyer not found" });
    }

    res.status(200).json({ message: "Lawyer deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

lawyerRoute.get("/", async (req, res) => {
  const { id } = req.query;

  if (id) {
    const lawyer = await LawyerModel.findOne({ _id: id });
  }

  let laywers = await LawyerModel.find();
  res.status(200).send(laywers);
});

module.exports = { lawyerRoute };
