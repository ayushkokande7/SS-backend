const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const Present_interns = require("./Routes/Present_interns");
const Auth = require("./Routes/Auth");
const Leaders = require("./Routes/Leaders");
const Past_interns = require("./Routes/Past_interns");
const Terminated_interns = require("./Routes/Terminated_interns");
const Quiz = require("./Routes/Quiz");
const cors = require("cors");
const Middleware = require("./Routes/Middleware");
app.use(bodyParser.json());
app.use(
  cors(),
  //   {
  //   origin: "https://rzx75l-3000.csb.app",
  //   credentials: true,
  //   //  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   // allowedHeaders: ['Content-Type', 'Authorization'],
  // }
);
app.use("/auth", Auth);
app.use("/leaders", Leaders);
app.use("/interns", Middleware, Present_interns);
app.use("/pinterns", Middleware, Past_interns);
app.use("/tinterns", Middleware, Terminated_interns);
app.use("/quiz", Quiz);
app.get("/music", (req, res) => {
  res.json([
    {
      name: "track 1",
      img: "",
      tracks: [
        {
          title: "Death Bed",
          artist: "Powfu",
          artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
          url: "https://pagalworld.com.pe/files/download/id/6511",
          id: "1",
        },
        {
          title: "Bad Liar",
          artist: "Imagine Dragons",
          artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
          url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
          id: "2",
        },
        {
          title: "Faded",
          artist: "Alan Walker",
          artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
          url: "https://samplesongs.netlify.app/Faded.mp3",
          id: "3",
        },
        {
          title: "Hate Me",
          artist: "Ellie Goulding",
          artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
          url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          id: "4",
        },
        {
          title: "Solo",
          artist: "Clean Bandit",
          artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
          url: "https://samplesongs.netlify.app/Solo.mp3",
          id: "5",
        },
        {
          title: "Without Me",
          artist: "Halsey",
          artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
          url: "https://samplesongs.netlify.app/Without%20Me.mp3",
          id: "6",
        },
      ],
    },
    {
      name: "track 12",
      img: "",
      tracks: [
        {
          title: "Death Bed",
          artist: "Powfu",
          artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
          url: "https://pagalworld.com.pe/files/download/id/6511",
          id: "1",
        },
        {
          title: "Bad Liar",
          artist: "Imagine Dragons",
          artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
          url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
          id: "2",
        },
        {
          title: "Faded",
          artist: "Alan Walker",
          artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
          url: "https://samplesongs.netlify.app/Faded.mp3",
          id: "3",
        },
        {
          title: "Hate Me",
          artist: "Ellie Goulding",
          artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
          url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          id: "4",
        },
        {
          title: "Solo",
          artist: "Clean Bandit",
          artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
          url: "https://samplesongs.netlify.app/Solo.mp3",
          id: "5",
        },
        {
          title: "Without Me",
          artist: "Halsey",
          artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
          url: "https://samplesongs.netlify.app/Without%20Me.mp3",
          id: "6",
        },
      ],
    },
    {
      name: "Atrack 1Nkit",
      img: "",
      tracks: [
        {
          title: "Death Bed",
          artist: "Powfu",
          artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
          url: "https://pagalworld.com.pe/files/download/id/6511",
          id: "1",
        },
        {
          title: "Bad Liar",
          artist: "Imagine Dragons",
          artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
          url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
          id: "2",
        },
        {
          title: "Faded",
          artist: "Alan Walker",
          artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
          url: "https://samplesongs.netlify.app/Faded.mp3",
          id: "3",
        },
        {
          title: "Hate Me",
          artist: "Ellie Goulding",
          artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
          url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          id: "4",
        },
        {
          title: "Solo",
          artist: "Clean Bandit",
          artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
          url: "https://samplesongs.netlify.app/Solo.mp3",
          id: "5",
        },
        {
          title: "Without Me",
          artist: "Halsey",
          artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
          url: "https://samplesongs.netlify.app/Without%20Me.mp3",
          id: "6",
        },
      ],
    },
    {
      name: "track 122",
      img: "",
      tracks: [
        {
          title: "Death Bed",
          artist: "Powfu",
          artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
          url: "https://pagalworld.com.pe/files/download/id/6511",
          id: "1",
        },
        {
          title: "Bad Liar",
          artist: "Imagine Dragons",
          artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
          url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
          id: "2",
        },
        {
          title: "Faded",
          artist: "Alan Walker",
          artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
          url: "https://samplesongs.netlify.app/Faded.mp3",
          id: "3",
        },
        {
          title: "Hate Me",
          artist: "Ellie Goulding",
          artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
          url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          id: "4",
        },
        {
          title: "Solo",
          artist: "Clean Bandit",
          artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
          url: "https://samplesongs.netlify.app/Solo.mp3",
          id: "5",
        },
        {
          title: "Without Me",
          artist: "Halsey",
          artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
          url: "https://samplesongs.netlify.app/Without%20Me.mp3",
          id: "6",
        },
      ],
    },
    {
      name: "track 12",
      img: "",
      tracks: [
        {
          title: "Death Bed",
          artist: "Powfu",
          artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
          url: "https://pagalworld.com.pe/files/download/id/6511",
          id: "1",
        },
        {
          title: "Bad Liar",
          artist: "Imagine Dragons",
          artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
          url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
          id: "2",
        },
        {
          title: "Faded",
          artist: "Alan Walker",
          artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
          url: "https://samplesongs.netlify.app/Faded.mp3",
          id: "3",
        },
        {
          title: "Hate Me",
          artist: "Ellie Goulding",
          artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
          url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
          id: "4",
        },
        {
          title: "Solo",
          artist: "Clean Bandit",
          artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
          url: "https://samplesongs.netlify.app/Solo.mp3",
          id: "5",
        },
        {
          title: "Without Me",
          artist: "Halsey",
          artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
          url: "https://samplesongs.netlify.app/Without%20Me.mp3",
          id: "6",
        },
      ],
    },
  ]);
});
app.get("/", (req, res) => {
  res.json("API working");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
