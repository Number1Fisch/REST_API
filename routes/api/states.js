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

router.route(":state/capital")

router.route(":state/nickname")

router.route(":state/population")

router.route(":state/admission")


module.exports = router;
