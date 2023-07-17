var arr = ['0','0','0'];
var arrMeasure = ['deg C', 'deg F', 'Kelvin'];

var temp = document.getElementById('temp');
var loc = document.getElementById('loc');
var desc = document.getElementById('desc');

function successFunc(pos){
    getWeatherByLatLon(pos);
    console.log("Hello from index.js")
}

function errorFunc(err){
    if(err.code == 1){
        console.log("Please Enable Location");
        document.getElementById('warn2').innerText = 'Please enable the location !';
    }
    else{
        console.log("Access Denied !");
        document.getElementById('warn2').innerText = 'Could not fetch weather. Please Retry!';
    }
}

function getLocation(){
    if(navigator.geolocation){
        const options = {
            enableHighAccuracy : true,
            timeout:5000
        }

        navigator.geolocation.getCurrentPosition(successFunc, errorFunc, options);
    }else{
        document.getElementById('warn2').innerText = 'Could not fetch weather. Please Retry!';
        console.log('hey')
    }
}
getLocation();

function setValuesLatLon(obj){
    loc.innerHTML = obj.city_name;
    temp.innerHTML = obj.data[0].temp;
    arr[0] = obj.data[0].temp;
    desc.innerHTML = obj.data[0].weather.description;
}

function setValuesByName(obj, name){
    loc.innerHTML = name;
    temp.innerHTML = obj.temp;
    arr[0] = obj.temp;
    desc.innerHTML = 'Feels like '+obj.feels_like+' deg C';
}

async function getWeatherByLatLon(pos){
    const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'de908e69b2msh1bc80cd32a36c8ap1b1015jsn07dcfd128694',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        setValuesLatLon(JSON.parse(result))
    } catch (error) {
        document.getElementById('warn2').innerHTML = 'Could not fetch weather. Please Retry!';
        console.error(error);
    }
}

async function getWeatherByName(name){
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${name}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '18213b8432msh70a429c96300b73p1a0d35jsn92e2e1889473',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
    if(response.status == 200){
	const result = await response.text();
	setValuesByName(JSON.parse(result), name);
    document.getElementById('take-inp').style.display = "none";
    document.getElementById('search').value = '';
}else{
    document.getElementById('warn').innerHTML = 'Could not fetch the weather<br>Please Retry!';
}
} catch (error) {
    console.error(error);
    document.getElementById('warn').innerHTML = 'Could not fetch the weather<br>Please Retry!';
    document.getElementById('search').value = '';
}
}



document.getElementById('btn-change').addEventListener("click", ()=>{
    document.getElementById('take-inp').style.display = "flex";
})

document.getElementById('hide-btn').addEventListener("click", ()=>{
    document.getElementById('take-inp').style.display = "none";
    document.getElementById('warn').innerHTML = '';
    document.getElementById('search').value = '';

})

document.getElementById('search-btn').addEventListener("click", ()=>{
   let res = document.getElementById('search').value;
   getWeatherByName(res)
   
})

let convertBtn = document.querySelectorAll('#temp-content');
var temp = document.getElementById('temp');
var measure = document.getElementById('measure');


var val = 0;

convertBtn[0].addEventListener("click", function(){
    let t  = ((1.8 * Number.parseFloat(arr[0])) + 32).toFixed(1);
    arr[1] = t.toString();
    t = Number.parseFloat(arr[0]) +273.15;
    arr[2] = t.toString();

    if(val == 0){
        temp.innerText = arr[val];
        measure.innerText = arrMeasure[val];
        val++;
    }else if(val == 1){
        temp.innerText = arr[val];
        measure.innerText = arrMeasure[val];
        val++;
    }else if(val == 2){
        temp.innerText = arr[val];
        measure.innerText = arrMeasure[val];
        val = 0;
    }else{
        console.log("hey");
    }
})

