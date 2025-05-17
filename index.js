import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let forecast = [];

function generateContent(content){
    const date = new Date();
    const newcontent ={};
    newcontent.date = date.getDate();
    newcontent.month = months[date.getMonth()];
    newcontent.temp = Math.round(content.main.temp - 273.15);
    newcontent.weather= content.weather[0].main;
    newcontent.condition = content.weather[0].description;
    newcontent.mintemp = (content.main.temp_min- 273.15).toFixed(2);
    newcontent.maxtemp = (content.main.temp_max- 273.15).toFixed(2);
    newcontent.feelslike = (content.main.feels_like- 273.15).toFixed(2);
    newcontent.humidity = content.main.humidity;
    newcontent.pressure = content.main.pressure;
    newcontent.windspeed = (content.wind.speed*3.6).toFixed(2); 
    const index = Math.floor((content.wind.deg + 11.25) / 22.5) % 16;
    newcontent.wind_dir= directions[index];
    newcontent.cloudcover = content.clouds.all;
    if( content.rain && content.rain['1h']){
        newcontent.rain = content.rain['1h']+" mm";
    }else{
        newcontent.rain = "None";
    }

    return newcontent;
}

function processForecast(forecast, address) {
    const newforecast = [];
    forecast.forEach(element => {
        if (element.dt_txt.includes("12:00:00")) {
            const content = generateContent(element);
            const [year, month, day] = element.dt_txt.split(' ')[0].split('-'); // Extract date parts
            content.date = parseInt(day); // Update the date field
            content.month = months[parseInt(month) - 1]; // Update the month field using the months array
            content.place = address;
            newforecast.push(content);
        }
    });
    return newforecast;
}

const yourAPI=process.env.openweatherAPI; //Enter your API keys from openweather and google's Geolocation api
const googleAPI= process.env.googleAPI;

app.get('/',async (req, res)=>{
    try{
        res.render("index.ejs", {
            message: "Start Searching To get started!",
            image: "search-city"
    });
    }catch(error){
        console.log(error.message)
        res.render("index.ejs", {
            message: "Sever error!",
            image: "not-found",
        })
    }
})

app.post('/search', async (req, res)=>{
    try{
        const response_google = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.place}&key=${googleAPI}`);
        const location = response_google.data.results[0].geometry.location;
        //console.log(response_google.data.results[0]);
        const latitude = location.lat;
        const longitude = location.lng;
        const address = response_google.data.results[0].formatted_address;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${yourAPI}`);
        const response_forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${yourAPI}&days=7`)
        const newcontent = generateContent(response.data);
        forecast = processForecast(response_forecast.data.list,address);
        newcontent.place = address;
        if(newcontent.date===forecast[0].date){
            forecast[0]=newcontent
        }else{
            forecast.unshift(newcontent);
        }
        //console.log(newcontent);
        console.log(forecast);
        res.render("index.ejs",{
            content: forecast,
            index: 0
    });
    }catch(error){
        console.log(error.message)
        res.render("index.ejs",{
            message: "No location found!",
            image: "search-city"
        });
    }
})

app.post("/forecast", (req,res)=>{
    try{
        res.render("index.ejs",{
        content: forecast,
        index: req.body.index
    });
    if (forecast.length===0||!forecast){
        res.render("index.js",{
            message: "Start Searching To get started!",
            image: "search-city"
        })
    }
} catch(error){
        res.render("index.ejs", {
            message: "Start Searching To get started!",
            image: "search-city"
        })
    }
});

app.listen(port, ()=>{
    console.log("Listening at port: "+port);
})