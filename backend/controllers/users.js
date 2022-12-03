const bcrypt = require("bcryptjs");
const { deleteImage } = require("../helpers/save-image");
const User = require("../models/user");
const Team = require("../models/team");
const Manager = require("../models/manager");
const { tokenJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    users,
    status: 200,
  });
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(402).send({ msg: "L'email è già utilizzata." });
    }

    const user = new User(req.body);

    // Cripta la password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Salva l'utente
    await user.save();

    // Crea token
    const token = await tokenJWT(user.id);

    res.json({
      user,
      token,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({ msg: "Qualcosa non ha funzionato." });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res
        .status(402)
        .send({ msg: "Non esiste nessun utente con queste credenziali." });
    }
    // Aggiorna dati utente
    const { password, email, ...fields } = req.body;

    if (userDB.email !== email) {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res
          .status(400)
          .send({ msg: "Esiste già un utente con questa email." });
      }
    }
    fields.email = email;
    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      user: userUpdated,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({ msg: "Qualcosa non ha funzionato." });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    const pathView = `./uploads/users/${userDB.img}`;
    if (!userDB) {
      return res
        .status(402)
        .send({ msg: "Non esiste nessun utente con queste credenziali." });
    }
    if (userDB.role === "ADMIN_ROLE") {
      return res
        .status(404)
        .send({ msg: "Non è possibile eliminare un utente amministratore." });
    }

    const countDocs = await User.find().countDocuments();

    if (countDocs == 1) {
      return res
        .status(404)
        .send({ msg: "Non puoi eliminare l'ultimo utente." });
    }

    if (userDB.img) {
      await deleteImage(pathView);
    }

    await Team.findOneAndUpdate({ user: uid }, { $unset: { user: "" } });
    await Manager.deleteOne({ user: uid });

    await User.findByIdAndDelete(uid);

    res.json({
      msg: "Utente eliminato.",
      countDocs,
      status: 200,
    });
  } catch (error) {
    res.status(500).send({ msg: "Qualcosa non ha funzionato." });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
