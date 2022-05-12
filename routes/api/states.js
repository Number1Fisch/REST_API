const express = require("express");
const router = express();
const stateController = require("../../controllers/stateController");

router
  .route("/")
  .get(stateController.getStates)
  .post(stateController.createNewState)
  .put(stateController.updateState)
  .delete(stateController.deleteState);

router.route("/?contig=:bool").get(stateController.getContigStates);

router.route("/:state").get(stateController.getState);

router.route("/:state/funfact").get(stateController.getStateFunFact);

router.route(":state/capital").get(stateController.getStateCapital);


router.route(":state/nickname").get(stateController.getStateNickname);

router.route(":state/population").get(stateController.getStatePopulation);

router.route(":state/admission").get(stateController.getStateAdmission);


module.exports = router;
