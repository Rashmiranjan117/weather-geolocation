let week = JSON.parse(localStorage.getItem("weeklyData"))
let city = (localStorage.getItem("city"))

function get(x){
    return document.getElementById(x)
}

function create(x){
    return document.createElement(x)
}

window.addEventListener("load",function(){
    get("container2").innerHTML=null;
    appendData(week)
})

let arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let day = new Date()

function appendData(week){
    console.log(week)
    get("city").innerText=city
    week.forEach(function(el,index){
       
        let d = create("h4");
        d= new Date(el.dt *1000).toLocaleDateString()
        console.log(d)
        console.log(el)
        let div = create("div")
        let tempMax= create("p")
        tempMax.innerText= `Max. Temp :${el.temp.min}°C`
        let tempMin= create("p")
        tempMin.innerText= `Min Temp :${el.temp.min}°C`
        let wt= create("p")
        wt.innerText= `Weather :${el.weather[0].main}.`
        
        let wind =create("p")
        wind.innerText=`Wind Speed : ${el.wind_speed}km/hr`
        div.append(d,tempMax,tempMin,wt,wind);
        get("container2").append(div)
    })
}


