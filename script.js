'use strict'
const searchInput=document.querySelector('.searchInput');
const stateName =document.querySelector('.state');
const SearchButton=document.querySelector('.SearchButton');
const container=document.querySelector('.container');
const weatherChange = document.querySelector('.weatherChange');
const humidity = document.querySelector('.humidity');
const season = document.querySelector('.season');
const temperature=document.querySelector('.temperature');
const sea = document.querySelector('.sea');
const speed=document.querySelector('.speed');
const min=document.querySelector('.min');
const max=document.querySelector('.max');
const image=document.querySelector('.img');
const searchInputInvalid=document.querySelector('.searchInputInvalid');
let sName;
let time;
let apikey="770ee330bcaf064c80af652e74c17739";
let lat,lon;
function getLocation() {
    if (navigator.geolocation) {
      
      navigator.geolocation.watchPosition(showPosition);
      
    } else { 
     console.log("Geolocation is not supported by this browser.");
    }
  }
      
  function showPosition(position) {
   
    lat=position.coords.latitude;
    lon=position.coords.longitude;
  
    placeName();

  }

  const placeName= async ()=>{
    let apiNo='50993e00aeca2c7ea867339335f5baed';
   const res=await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiNo}`);
   
    const data=await res.json();
   
    searchInput.value=data[0].name;
    LoadDate();
};
getLocation();
SearchButton.addEventListener('click',function(){

    LoadDate();
})
 async function LoadDate(){
    try{
       const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=770ee330bcaf064c80af652e74c17739`);
      console.log(res);
       if(res.ok){
        
        searchInputInvalid.classList.add('hidden');
        
       }

       else{
        console.log('hi');
        searchInputInvalid.classList.remove('hidden');
       }
       const data=await res.json();
       console.log(data)
       sName=data.name;
       console.log(data.name);
       time=data.timezone;
       stateName.textContent=sName;
       season.textContent=data.weather[0].main
       weatherChange.textContent= data.weather[0].description;
       speed.textContent='Wind speed: '+data.wind.speed+'km/hr';
       humidity.textContent='Humidity : '+data.main.humidity+'%';   
       temperature.textContent='Temperature: '+Math.floor(Math.floor(data.main.temp )- 273.15)+'°C';
       min.textContent="Min-Temperature: "+Math.floor(data.main.temp_min - 273.15)+'°C' ;
       max.textContent="Min-Temperature: "+Math.floor   (Math.floor(data.main. temp_max) - 274.15 )+'°C';
       image.src=`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`
    }
    catch(err){
        // console.log(err,"ertyuiuytretyu")
        searchInputInvalid.classList.add('.hidden');
      
    }
}
/*
const successiveCallback=(pos)=>{
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);   
};
const errorCallback=(err)=>console.log(err);


function CurrentLocation(){
    console.log('CurrentLocation',navigator.geolocation)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((successiveCallback) => {
            console.log('enter')
        let lat = successiveCallback.coords.latitude;
        let long = successiveCallback.coords.longitude;
    
        console.log(lat,long);
        });
    }
    else{
        console.log('error');
    }
  }
  */