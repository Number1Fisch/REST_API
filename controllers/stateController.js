

const State = require("../model/State");

//Get all states
const getStates = async (req, res) => {
  const states = await State.find().exec();
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
    const result = req.body;
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
  }
};

//Update State
const updateState = async (req, res) => {
  if (!req?.body.id) {
    return res.status(400).json({ message: "Id parameter is required. " });
  }
  const state = await State.findOne({ "stateCode": req.body.stateCode }).exec();

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

  const state = await State.findOne({ _id: req.body.stateCode }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches stateCode ${req.body.stateCode}` });
  }
  const result = await state.deleteOne({ _id: req.body.stateCode });
  res.json(result);
};

const getContigStates = async (req, res) => {
  if (!req?.params?.contig) {
    return res.status(400).json({ message: "Contigous condition is required " });
  }
  const states = await State.find();
  if (req.params.contig){
    states.filter(stateCode != 'AK' || stateCode != 'HI').exec();
  }
  else{
    states.filter(stateCode == 'AK' || stateCode == 'HI').exec();
  }
}


//Get State
const getState = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "State code is required. " });
  }
  const stateCode = (req.params.id).toUpperCase();
  const state = await State.findOne({ "stateCode":stateCode }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches code ${req.params.state}` });
  }
  res.json(state);
};

const getStateFunFact = async (req, res) => {
  if (!req?.params?.stateCode) {
    return res.status(400).json({ message: "State code is required. " });
  }

  const state = await State.findOne({ stateCode: req.params.stateCode }).exec();
  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches Id ${req.params.state}` });
  }
  res.json(state.funfacts[0]);
};

const getStateCapital = async (req, res) => {
  fs.readFile('./model/states.json', (err, data) => {
    if (err) throw err;
    var statesList = JSON.parse(data);
    statesList.filter(req.params.stateCode)
    return res.json(statesList.capital_city)
  })
};

const getStateNickname = async (req, res) => {
  fs.readFile('./model/states.json', (err, data) => {
    if (err) throw err;
    var statesList = JSON.parse(data);
    statesList.filter(req.params.stateCode)
    return res.json(statesList.nickname)
  })
};

const getStatePopulation = async (req, res) => {
  fs.readFile('./model/states.json', (err, data) => {
    if (err) throw err;
    var statesList = JSON.parse(data);
    statesList.filter(req.params.stateCode)
    return res.json(statesList.population)
  })
};

const getStateAdmission = async (req, res) => {
  fs.readFile('./model/states.json', (err, data) => {
    if (err) throw err;
    var statesList = JSON.parse(data);
    statesList.filter(req.params.stateCode)
    return res.json(statesList.admission)
  })
};

module.exports = {
  getStates,
  updateState,
  deleteState,
  createNewState,
  getContigStates,
  getStateFunFact,
  getStateCapital,
  getStateNickname,
  getState,
  getStatePopulation,
  getStateAdmission,
};
