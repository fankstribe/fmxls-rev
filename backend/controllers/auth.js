const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { tokenJWT } = require("../helpers/jwt");
const {
  getMenuFrontend,
  getMenuAdminFrontend,
} = require("../helpers/menu-frontend");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verifica email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(402).send({
        msg:
          "La mail inserita " +
          req.body.email +
          " non è associata a nessun account.",
      });
    }
    // Verifica password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res
        .status(403)
        .send({ msg: "La password inserita non è corretta." });
    }

    // Crea token
    const token = await tokenJWT(userDB.id);

    res.json({
      msg: "Login avvenuto con successo!",
      token,
      menu: getMenuFrontend(userDB.role),
      adminMenu: getMenuAdminFrontend(userDB.role),
      status: 200,
    });
  } catch (error) {
    res.status(500).send({ msg: "Qualcosa non ha funzionato." });
  }
};

const tokenRefresh = async (req, res) => {
  const uid = req.uid;

  const token = await tokenJWT(uid);
  const user = await User.findById(uid);

  res.json({
    token,
    user,
    menu: getMenuFrontend(user.role),
    adminMenu: getMenuAdminFrontend(user.role),
    status: 200,
  });
};

module.exports = {
  login,
  tokenRefresh,
};
