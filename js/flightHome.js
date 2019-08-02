const flightsForm = document.querySelector('.flightsForm');
const flyFrom = document.querySelector('.flightsForm .flyFrom');
const flyTo = document.querySelector('.flightsForm .flyTo');
let queryResults = document.querySelector('.search-result .row');

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
        resultList.classList.remove('d-none');
        // resultList.innerHTML += `<li class="city-data">${city}</li>`;
        // let listData = document.querySelector('.city-data');
        listData.addEventListener('click', (e) => {
            flyFrom.value = listData.textContent;
            resultList.classList.add('d-none');
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
        resultList.classList.remove('d-none');
        resultList.appendChild(listData);
        // resultList.innerHTML += `<li class="city-data">${city}</li>`;
        // let listData = document.querySelector('.city-data');
        listData.addEventListener('click', (e) => {
            flyTo.value = listData.textContent;
            resultList.classList.add('d-none');
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
    const query = `?flyFrom=${flyFrom_}&to=${flyTo_}&dateFrom=${checkIn}&dateTo=${checkOut}&partner=picky&curr=NGN`;

    const response = await fetch(base + query);
    
    const data = await response.json();

    console.log(data)
    // window.location.assign('http://127.0.0.1:5500/flight-search-result.html' + query)
    const searchResults = data.data;
    console.log(searchResults);

    const response2 = await fetch('https://api.skypicker.com/airlines');
    const airlines = await response2.json()

    let queryResults = document.querySelector('.search-result .row');
    queryResults.innerHTML = " ";    
    let airLine = null;
    searchResults.forEach((element, index) => {

        airlines.forEach((airline)=> {
            if(airline.id == element.route[0].airline){
                airLine = airline.name 
            }
        })
        
        let departure = new Date(element.dTime * 1000);
        let departureDate = departure.toLocaleTimeString();
        let departureTime = departure.toDateString();
        let arrival = new Date(element.aTime * 1000);
        let arrivalDate = arrival.toLocaleTimeString();
        let arrivalTime = arrival.toDateString();

        var displayElem = index >= 8 ? "d-none" : "";
        queryResults.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 search-results ${displayElem}">
        <div class="grid-block main-block f-grid-block">
            <a href="flight-detail-left-sidebar.html">
                <div class="main-img f-img">
                    <img src="images/flight-6.jpg" class="img-responsive" alt="flight-img" />
                </div><!-- end f-img -->
            </a>
            <ul class="list-unstyled list-inline offer-price-1">
                <li class="price">&#x20A6;${element.price}<span class="divider">|</span><span class="pkg">2 Stay</span></li>
            </ul>
            
            <div class="block-info f-grid-info">
                <div class="f-grid-desc">
                    <span class="f-grid-time"><i class="fa fa-clock-o"></i>${element.fly_duration}</span>
                    <h3 class="block-title"><a href="flight-detail-left-sidebar.html">${element.cityTo} to ${element.cityFrom}</a></h3>
                    <p class="block-minor"><span>${airLine},</span> Oneway Flight</p>
                    <p>Lorem ipsum dolor sit amet, ad duo fugit aeque fabulas, in lucilius prodesset pri. Veniam delectus ei </p>
                </div><!-- end f-grid-desc -->
                
                <div class="f-grid-timing">
                    <ul class="list-unstyled">
                        <li><span><i class="fa fa-plane"></i></span><span class="date">${departureTime} </span>(${departureDate})</li>
                        <li><span><i class="fa fa-plane"></i></span><span class="date">${arrivalTime}</span>(${arrivalDate})</li>
                    </ul>
                </div><!-- end flight-timing -->
                
                <div class="grid-btn">
                    <a href="flight-detail-left-sidebar.html?flyFrom=${element.cityFrom}&flyTo=${element.cityTo}&checkIn=${checkIn}&checkOut=${checkOut}&duration=${element.fly_duration}&token=${element.booking_token}&price=${element.price}" class="btn btn-orange btn-block btn-lg">View More</a>
                </div><!-- end grid-btn -->
            </div><!-- end f-grid-info -->
        </div><!-- end f-grid-block -->
    </div>`;
        console.log(element.cityFrom);

        // const allResults = document.querySelectorAll('.search-results')
        // let j = 0;
        // const l = allResults.length;
        // console.log(l);
        // for (let i = j; i < l; i++) {
        //     const element = allResults[i];
        //     element.classList.remove('d-none');
        //     if(i % 8 == 0){
        //         break;
        //     }
            
        // }

    });


    console.log(queryResults);    
    // console.log(data);
    // console.log(flyFrom.value, flyTo.value,)
    // console.log(flightsForm.checkIn.value);

   // https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2018&dateTo=12/12/2018&partner=picky
});





