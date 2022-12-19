
function get(x){
    return document.getElementById(x)
}

function create(x){
    return document.createElement(x)
}

let api="780394a78657001a17b66be2b1695f61"

let container2= get("container2")

let map = {
    1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "June", 7: "July", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
}

let btn= get("btn")
btn.addEventListener("click",getData)

async function getData(){
let query = get("query").value;

// console.log(query);
let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api}&units=metric`)
let data = await res.json();
// console.log(data)
localStorage.setItem("city",query)

try{
    let lat = await data.coord.lat
    let lon= await data.coord.lon;
    //https://api.openweathermap.org/data/2.5/onecall?lat=19.0760&lon=72.8777&appid={yourAPIkey}
    // console.log(lat,lon)
    let RES= await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}&units=metric`)
    let DATA= await RES.json();
    localStorage.setItem("weeklyData",JSON.stringify(DATA.daily))
    // console.log(data)
    appendData(DATA.daily,data)
}
catch(err){
    console.log("err",err)
}
}

//rourkela 
let symbol = " ° "
//weather icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
function appendData(week,data){
// console.log(week)
let name = data.name;
console.log(data)
let today= new Date()
let location= get("gmap_canvas")
location.setAttribute("src",`https://maps.google.com/maps?q=${name}&t=&z=13&ie=UTF8&iwloc=&output=embed`)

//https://maps.google.com/maps?q=rourkela&t=&z=13&ie=UTF8&iwloc=&output=embed

let c= get("c");
c.innerText= `${data.name}, ${data.sys.country}`;
let top_left= get("top_left");
let date = get("date");
date.innerText=`${map[today.getUTCMonth()]} ${today.getDate()}, ${today.getHours()}:${today.getMinutes()} `
let orgTemp= get("orgTemp")
orgTemp.innerText =`${data.main.temp}°C`
let feels_like= get("feels_like")
feels_like.innerText= `Feels Like ${data.main.feels_like}°C. `
let wt1= get("wt1")
wt1.innerText=  `${data.weather[0].main}. `
let wt2= get("wt2")
wt2.innerText=`${data.weather[0].description}. `

let wind= get("wind")
wind.innerText=`${data.wind.speed} WNW`
let humidity= get("humidity")
humidity.innerText=`Humidity :${data.main.humidity}%`
let dew= get("p")
dew.innerText="13°C"
let pressure= get("pressure")
pressure.innerText=`${data.main.pressure}hPa`;
let uv= get("uv");
uv.innerText="UV : 4"

let visibility= get("visibility");
visibility.innerText=`${data.visibility/1000} Km.`


}

