const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, resp) {
  resp.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, resp){
  const query = req.body.cityName;
  const apiKey = "f2df1f7f072958f509336762b5d55918"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
      resp.write(`<h1>The weather in ${query} is ${description}</h1>`)
      resp.write(`<h1>The temperature in ${query} is ${temp} Degree Celcius</h1>`)
      resp.write(`<h1><img src=${imageUrl}></h1>`)
      resp.send()
    })
  })
});

app.listen(3000);