import express from "express";
import { StudentModel } from "../models/student.ts";

const router = express.Router();

router.get("/", async (req, res) => {
  const students = await StudentModel.find();
  res.status(200).send(students);
});

router.post("/", async (req, res) => {
  const data = req.body;
  console.log({ data });
  const student = new StudentModel(data);
  await student.save();
  res.status(201).send(student);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const student = await StudentModel.findByIdAndUpdate(id, data, { new: true });
  if (!student) {
    return res.status(404).send({ message: "Student not found" });
  } else {
    return res.status(200).send(student);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const student = await StudentModel.findByIdAndDelete(id);
  res.status(200).send(student);
});

export default router;
