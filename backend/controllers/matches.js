const { response } = require("express");

const Tournament = require("../models/tournament");
const Match = require("../models/match");

const getMatch = async (req, res = response) => {
  const id = req.params.id;

  try {
    const match = await Match.findOne({ _id: id })
      .populate({
        path: "homeTeam",
        select: '-matches -tournaments',
        populate: [{ path: 'players' }]
      })
      .populate({
        path: "awayTeam",
        select: '-matches -tournaments',
        populate: [{ path: 'players' }]
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

const updateMatch = async (req, res = response) => {
  try {
    const id = req.params.id;
    const match = await Match.findById(id);
    const matchData = { completed: true, ...req.body };

    if (match) {
      const mergedMatch = { ...match, ...matchData };
      const update = await Match.findByIdAndUpdate(id, mergedMatch)
        .populate({
          path: "homeTeam",
          select: "-matches -tournaments",
          populate: [{ path: "players" }],
        })
        .populate({
          path: "awayTeam",
          select: "-matches -tournaments",
          populate: [{ path: "players" }],
        });
    }

    res.json({
      ok: true,
      update,
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
  updateMatch,
};
