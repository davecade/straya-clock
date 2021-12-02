const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const timezones = {
  NSW: null,
  QLD: null,
  VIC: null,
  SA: null,
  NT: null,
  WA: null,
  TAS: null,
};

app.get("/map", async (req, res) => {
  const requestOne = axios.get(
    `https://worldtimeapi.org/api/timezone/Australia/Sydney`
  );
  const requestTwo = axios.get(
    `https://worldtimeapi.org/api/timezone/Australia/Brisbane`
  );
  const requestThree = axios.get(
    `https://worldtimeapi.org/api/timezone/Australia/Melbourne`
  );
  const requestFour = axios.get(
    `https://worldtimeapi.org/api/timezone/Australia/Adelaide`
  );
  const requestFive = axios.get(
    `https://worldtimeapi.org/api/timezone/Australia/Darwin`
  );
  const requestSix = axios.get(
    `https://worldtimeapi.org/api/timezone/Australia/Perth`
  );
  const requestSeven = axios.get(
    `https://worldtimeapi.org/api/timezone/Australia/Hobart`
  );

  const mapData = await axios.all([
    requestOne,
    requestTwo,
    requestThree,
    requestFour,
    requestFive,
    requestSix,
    requestSeven,
  ]);

  if (!timezones.NSW) {
    timezones.NSW = mapData[0].data.utc_offset;
    timezones.QLD = mapData[1].data.utc_offset;
    timezones.VIC = mapData[2].data.utc_offset;
    timezones.SA = mapData[3].data.utc_offset;
    timezones.NT = mapData[4].data.utc_offset;
    timezones.WA = mapData[5].data.utc_offset;
    timezones.TAS = mapData[6].data.utc_offset;
  }

  const currentTime = {
    NSW: mapData[0].data.datetime.slice(11, 19),
    QLD: mapData[1].data.datetime.slice(11, 19),
    VIC: mapData[2].data.datetime.slice(11, 19),
    SA: mapData[3].data.datetime.slice(11, 19),
    NT: mapData[4].data.datetime.slice(11, 19),
    WA: mapData[5].data.datetime.slice(11, 19),
    TAS: mapData[6].data.datetime.slice(11, 19),
  };
  res.send(currentTime);
});

app.get("/convert", (req, res) => {
  const { convertFromState, convertedState } = req.query;

  const fromHour = Number(timezones[convertFromState].slice(1, 3));
  const fromMinutes = Number(timezones[convertFromState].slice(4));
  const toHour = Number(timezones[convertedState].slice(1, 3));
  const toMinutes = Number(timezones[convertedState].slice(4));

  const hourDiff = fromHour - toHour;
  const minDiff = fromMinutes - toMinutes;

  console.log("TIMEZONE:", timezones);

  //-- if this is negative, you need to add. If positive, you need to minus
  //-- this goes for both ours and minutes. They need to be checked separfately
  console.log(`DIFFERENCE: ${hourDiff}:${minDiff}`);

  res.send("DONE");
});

app.get("/postcode/:code", async (req, res) => {
  const fetchPostcodeData = await axios.get(
    `https://api.jsacreative.com.au/v1/suburbs?postcode=${req.params.code}`
  );
  res.send(fetchPostcodeData.data);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

//-- Runs server
app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server runnning on port ${port}`);
});
