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
  NZ: null
};

const locations = ["NSW", "QLD", "VIC", "SA", "NT", "WA", "TAS", "NZ"];

//-- Adds zero if hour or minute is a single digit
const formatZero = (num) => (num < 10 ? `0${num}` : num);

const timeConverter = (fromTime, hourDiff, minDiff, location) => {
  let resultHour;
  let resultMin;

  const fromHour = Number(fromTime.slice(0, 2));
  const fromMin = Number(fromTime.slice(3));

  if (hourDiff < 0) {
    resultHour = fromHour + Math.abs(hourDiff);
  } else {
    resultHour = fromHour - hourDiff;
  }

  if (minDiff < 0) {
    resultMin = fromMin + Math.abs(minDiff);
  } else {
    resultMin = fromMin - minDiff;
  }

  //--If minute is 60 or more after adding
  if (resultMin > 59) {
    resultMin = resultMin - 60;
    resultHour++;
  }

  //--If minute is negative after subtracting
  if (resultMin < 0) {
    resultMin = resultMin + 60;
    resultHour--;
  }

  //-- if the hour is 24 or more, then we minus 24
  if (resultHour > 23) {
    resultHour = resultHour - 24;
  }

  //-- if the hour is negative, then we add 24
  if (resultHour < 0) {
    resultHour = resultHour + 24;
  }

  return {
    state: location,
    time: `${formatZero(resultHour)}:${formatZero(resultMin)}`,
  };
};

const getListOfTimes = (convertFromState, convertFromTime) => {

  const result = locations.map((location) => {
    const fromHour = Number(timezones[convertFromState].slice(1, 3));
    const fromMinutes = Number(timezones[convertFromState].slice(4));
    const toHour = Number(timezones[location].slice(1, 3));
    const toMinutes = Number(timezones[location].slice(4));
    const hourDiff = fromHour - toHour;
    const minDiff = fromMinutes - toMinutes;

    return timeConverter(convertFromTime, hourDiff, minDiff, location);
  });

  return result;
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
  const requestEight = axios.get(
    `https://worldtimeapi.org/api/timezone/Pacific/Auckland`
  );

  const mapData = await axios.all([
    requestOne,
    requestTwo,
    requestThree,
    requestFour,
    requestFive,
    requestSix,
    requestSeven,
    requestEight
  ]);

  if (!timezones.NSW) {
    timezones.NSW = mapData[0].data.utc_offset;
    timezones.QLD = mapData[1].data.utc_offset;
    timezones.VIC = mapData[2].data.utc_offset;
    timezones.SA = mapData[3].data.utc_offset;
    timezones.NT = mapData[4].data.utc_offset;
    timezones.WA = mapData[5].data.utc_offset;
    timezones.TAS = mapData[6].data.utc_offset;
    timezones.NZ = mapData[7].data.utc_offset
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
  const { convertFromState, convertFromTime } = req.query;

  const result = getListOfTimes(convertFromState, convertFromTime);

  res.send(result);
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
