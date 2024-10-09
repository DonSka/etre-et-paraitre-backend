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
let rounds = [
  {
    id: 1,
    name: "Personnalité",
  },
  {
    id: 2,
    name: "Situations",
  },
  {
    id: 3,
    name: "Relations",
  },
  {
    id: 4,
    name: "Représentations",
  },
];
let questions = [
  {
    id: 1,
    round_id: 1,
    name: "Vos vrais amis, vous les comptez ...",
    answer_1: "Sur les doigts d'une main",
    answer_2: "Sur les deux mains",
    answer_3: "Vous n'avez pas assez de doigts pour les compter",
    answer_4: "Vous n'en avez pas",
  },
  {
    id: 2,
    round_id: 1,
    name: "À quelle fréquence vous observez-vous à travers un miroir ou des photos ?",
    answer_1: "Plus souvent que la plupart des gens",
    answer_2: "Moins souvent que la plupart des gens",
    answer_3: null,
    answer_4: null,
  },
  {
    id: 3,
    round_id: 1,
    name: "Mentez-vous ?",
    answer_1: "Plus que la plupart des gens",
    answer_2: "Moins que la plupart des gens",
    answer_3: null,
    answer_4: null,
  },
];

function getRandomQuestion(roundId) {
  const roundQuestions = questions.filter((q) => q.round_id === roundId);
  return roundQuestions[Math.floor(Math.random() * roundQuestions.length)];
}

// function getNextPlayer(game) {
//   game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
//   return game.players[game.currentPlayerIndex];
// }

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

  socket.on("show-answers", (gamePin) => {
    io.to(gamePin).emit("show-answers");
  });

  socket.on("show-ranking", (gamePin) => {
    io.to(gamePin).emit("show-ranking");
  });

  socket.on("show-end-round", (gamePin) => {
    io.to(gamePin).emit("show-end-round");
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
  const { pin, username } = req.body;

  let game = games.find((g) => g.pin === pin);

  if (game) {
    const newPlayer = {
      id: game.players.length + 1,
      username: username,
      points: 0,
    };

    game.players.push(newPlayer);

    io.to(pin).emit("player-joined", game);

    return res.json({
      message: "Joueur ajouté à la partie existante",
      game,
      currentPlayer: newPlayer,
    });
  } else {
    const newPlayer = {
      id: 1,
      username: username,
      points: 0,
    };

    const newGame = {
      id: games.length + 1,
      pin: pin,
      players: [newPlayer],
    };

    games.push(newGame);

    io.to(pin).emit("game-created", newGame);

    return res.json({
      message: "Nouvelle partie créée",
      game: newGame,
      currentPlayer: newPlayer,
    });
  }
});

app.post("/start-game", (req, res) => {
  const { pin } = req.body;

  let game = games.find((g) => g.pin === pin);

  if (game) {
    const currentRound = rounds[0];
    const currentQuestion = getRandomQuestion(currentRound.id);
    const roundPlayer = game.players[0];

    io.to(pin).emit("game-started", {
      currentRound,
      currentQuestion,
      roundPlayer,
    });

    return res.json({
      message: "Le jeu a démarré",
      currentRound,
      currentQuestion,
      roundPlayer: roundPlayer,
    });
  } else {
    return res.status(404).json({ message: "Partie non trouvée" });
  }
});

app.post("/submit-answer", (req, res) => {
  const { pin, rightAnswer, roundPlayer } = req.body;

  let game = games.find((g) => g.pin === pin);

  if (game) {
    game.rightAnswer = rightAnswer;
    const player = game.players.find((p) => p.id === roundPlayer.id);
    player.has_answered = true;
    player.answer = rightAnswer;

    io.to(pin).emit("right-answer-submitted", rightAnswer);

    return res.json({ message: "Bonne réponse soumise", rightAnswer });
  } else {
    return res.status(404).json({ message: "Partie non trouvée" });
  }
});

app.post("/submit-guess", (req, res) => {
  const { pin, playerId, guessedAnswer } = req.body;

  let game = games.find((g) => g.pin === pin);

  if (game) {
    const player = game.players.find((p) => p.id === playerId);

    if (!player) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }

    const isCorrect = guessedAnswer === game.rightAnswer;
    if (isCorrect) {
      player.points += 1;
    }

    player.has_answered = true;
    player.answer = guessedAnswer;

    let allAnswered = game.players.every((p) => p.has_answered);

    if (allAnswered) {
      io.to(pin).emit("all-answered", true, game.players);
    }

    return res.json({
      message: isCorrect ? "Bonne réponse, points ajoutés" : "Mauvaise réponse",
      isCorrect,
      hasAnswered: true,
      answer: guessedAnswer,
    });
  } else {
    return res.status(404).json({ message: "Partie non trouvée" });
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
