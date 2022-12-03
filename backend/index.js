require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const { dbConnection } = require("./database/config");

const userRoutes = require("./routes/users");
const teamRoutes = require("./routes/teams");
const managerRoutes = require("./routes/managers");
const tournamentRoutes = require("./routes/tournaments");
const matchRoutes = require("./routes/matches");
const goalRoutes = require("./routes/goal");
const playerRoutes = require("./routes/players");
const playerDbsRoutes = require("./routes/playersdbs");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/uploads");

// Inizializza servizio express
const app = express();

// Cors
app.use(cors());

app.use(express.json());

// Database
dbConnection();

// Rotte
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/playersdbs", playerDbsRoutes);

app.use("/api/login", authRoutes);
app.use("/api/uploads", uploadRoutes);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:4200"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connesso id: ${socket.id}`);
  socket.on("disconnect", (reason) => {
    console.log("Socket disconnesso " + reason);
  });
});

global.io = io;

server.listen(process.env.PORT, () => {
  console.log("Servizio attivo su porta " + process.env.PORT);
});
