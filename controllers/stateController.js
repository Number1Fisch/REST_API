

const State = require("../model/State");

//Get all states
const getStates = async (req, res) => {
  const states = await State.find();
  if (!states)
    return res.status(400).json({ message: "No state found." });
  res.json(states);
};

//Create an State
const createNewState = async (req, res) => {
  if (!req?.body.stateCode) {
    return res.status(400).json({ message: "State Code is required" });
  }
  try {
    const result = await State.create({
      firstname: req.body.stateCode,
      lastname: req.body.funfacts,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

//Update State
const updateState = async (req, res) => {
  if (!req?.body.id) {
    return res.status(400).json({ message: "Id parameter is required. " });
  }
  const state = await State.findOne({ _id: req.body.id }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches Id ${req.body.id}` });
  }
  if (req.body?.stateCode) state.stateCode = req.body.stateCode;
  if (req.body?.funfacts) state.funfacts = req.body.funfacts;

  const result = await state.save();
  res.json(result);
};

//Delete State
const deleteState = async (req, res) => {
  if (!req?.body.id) {
    return res.status(400).json({ message: "State Id is required. " });
  }

  const state = await State.findOne({ _id: req.body.id }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches Id ${req.body.id}` });
  }
  const result = await state.deleteOne({ _id: req.body.id });
  res.json(result);
};

//Get State
const getState = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "State Id is required. " });
  }

  const state = await State.findOne({ _id: req.params.id }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches Id ${req.params.id}` });
  }
  res.json(state);
};

module.exports = {
  getStates,
  updateState,
  deleteState,
  createNewState,
  getState,
};
