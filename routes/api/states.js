const express = require("express");
const router = express();
const stateController = require("../../controllers/stateController");

router
  .route("/")
  .get(stateController.getStates)
  .post(stateController.createNewState)
  .put(stateController.updateState)
  .delete(stateController.deleteState);

router.route("/:id").get(stateController.getState);

module.exports = router;
