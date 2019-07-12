const flightsForm = document.querySelector('.flightsForm');
const flyFrom = document.querySelector('.flightsForm .flyFrom');
const flyTo = document.querySelector('.flightsForm .flyTo');

const autoComplete = (field, apiurl) => {
    field.addEventListener('keypress', () =>{
        //code function
    })
}
let fromCode = null;
let toCode = null;

flyFrom.addEventListener('keyup', async () => {
    let input = flyFrom.value;
    const base = "https://api.skypicker.com/locations";
    const query = `?term=${input}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name`;

    const response = await fetch(base + query);
    const data = await response.json();
    
    const cities = data.locations;
    fromCode = data.locations[0].city.code;
   
    const resultList = document.querySelector('.result-list');
    resultList.innerHTML = "";
    // console.log(data.locations[0].city.name);
    cities.forEach(element => {
        const city = element.city.name;
        let listData = document.createElement("li");
        listData.textContent = city;
        resultList.appendChild(listData);
        // resultList.innerHTML += `<li class="city-data">${city}</li>`;
        // let listData = document.querySelector('.city-data');
        listData.addEventListener('click', (e) => {
            flyFrom.value = listData.textContent;
        })
        // input = listData;
        // console.log(city);
    });
    // return data[0];

});

// let FromCode = null;
// let ToCode = null;

flyTo.addEventListener('keyup', async () => {
    let input = flyTo.value;
    const base = "https://api.skypicker.com/locations";
    const query = `?term=${input}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name`;

    const response = await fetch(base + query);
    const data = await response.json();
    
    const cities = data.locations;
    const resultList = document.querySelector('.result-listTo');
    resultList.innerHTML = "";
    // console.log(data.locations[0].city);
   
    toCode = data.locations[0].city.code;
    // console.log(ToCode);
    cities.forEach(element => {
        const city = element.city.name;
        let listData = document.createElement("li");
        listData.textContent = city;
        resultList.appendChild(listData);
        // resultList.innerHTML += `<li class="city-data">${city}</li>`;
        // let listData = document.querySelector('.city-data');
        listData.addEventListener('click', (e) => {
            flyTo.value = listData.textContent;
        })
        // input = listData;
        // console.log(city);
    });
    // return data[0];
    
})

flightsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const flyFrom_ = fromCode
    const flyTo_ = toCode;
    const checkIn = flightsForm.checkIn.value;
    const checkOut = flightsForm.checkOut.value;
    const base = "https://api.skypicker.com/flights";
    const query = `?flyFrom=${flyFrom_}&to=${flyTo_}&dateFrom=${checkIn}&dateTo=${checkOut}&partner=picky`;

    const response = await fetch(base + query);
    
    const data = await response.json();
    // window.location.assign('http://127.0.0.1:5500/flight-search-result.html' + query)
    console.log(data);

    // console.log(data);
    // console.log(flyFrom.value, flyTo.value,)
    // console.log(flightsForm.checkIn.value);

   // https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2018&dateTo=12/12/2018&partner=picky
});



// const baseurl = 'https://api.skypicker.com/locations';
// const queries = 'locale=en-US&location_types=airport&limit=10&active_only=true&sort=name';



// ?term=PRG&

