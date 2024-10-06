const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

let games = [];

io.on("connection", (socket) => {
  console.log("Un joueur s'est connecté : ", socket.id);

  socket.on("disconnect", () => {
    console.log("Un joueur s'est déconnecté : ", socket.id);
  });

  socket.on("join-game", (gamePin) => {
    socket.join(gamePin);
    console.log(
      `Le joueur ${socket.id} a rejoint la partie avec le PIN : ${gamePin}`
    );
  });
});

app.post("/check-pin", (req, res) => {
  const { pin } = req.body;

  const game = games.find((g) => g.pin === pin);

  if (game) {
    return res.json({ valid: true, message: "Le code PIN est valide", game });
  } else {
    return res.status(404).json({ valid: false, message: "Code PIN invalide" });
  }
});

app.post("/create-game", (req, res) => {
  const { pin, player } = req.body;

  let game = games.find((g) => g.pin === pin);

  if (game) {
    const newPlayer = {
      id: game.players.length + 1,
      username: player,
      points: 0,
    };

    game.players.push(newPlayer);

    io.to(pin).emit("player-joined", game);

    return res.json({ message: "Joueur ajouté à la partie existante", game });
  } else {
    const newGame = {
      id: games.length + 1,
      pin: pin,
      players: [
        {
          id: 1,
          username: player,
          points: 0,
        },
      ],
    };

    games.push(newGame);

    io.to(pin).emit("game-created", newGame);

    return res.json({ message: "Nouvelle partie créée", game: newGame });
  }
});

app.post("/start-game", (req, res) => {
  const { pin } = req.body;

  let game = games.find((g) => g.pin === pin);

  if (game) {
    io.to(pin).emit("game-started", {
      currentRound: { id: 1, name: "Personnalité" },
    });

    return res.json({
      message: "Le jeu a démarré",
      currentRound: { id: 1, name: "Personnalité" },
    });
  } else {
    return res.status(404).json({ message: "Partie non trouvée" });
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
