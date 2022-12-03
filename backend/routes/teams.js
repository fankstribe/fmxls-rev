/* Route: /api/teams */
const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator } = require("../middlewares/validate");
const { jwtValidator } = require("../middlewares/validate-jwt");

const {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  getTeam,
} = require("../controllers/teams");

const router = Router();

router.get("/", jwtValidator, getTeams);

router.get("/:team", jwtValidator, getTeam);

router.post(
  "/",
  [
    jwtValidator,
    check("teamName", "Il nome della squadra è obbligatorio").not().isEmpty(),
    fieldValidator,
  ],
  createTeam
);

router.put("/:id", jwtValidator, updateTeam);

router.delete("/:id", jwtValidator, deleteTeam);

module.exports = router;
