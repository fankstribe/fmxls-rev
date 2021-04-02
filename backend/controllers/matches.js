const { response } = require("express");

const Tournament = require("../models/tournament");
const Match = require("../models/match");

const getMatch = async (req, res = response) => {
  const id = req.params.id;

  try {
    const match = await Match.findOne({ _id: id })
      .populate({
        path: "homeTeam",
      })
      .populate({
        path: "awayTeam",
      })
      .populate("tournament", { tournamentName: 1 });

    res.json({
      ok: true,
      match,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Errore inatteso",
    });
  }
};

module.exports = {
  getMatch,
};
