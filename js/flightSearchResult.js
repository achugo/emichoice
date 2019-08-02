const formBooking = document.getElementById('postData');
let url = window.location.href;

const pageData = url.split("?")
const mainData = pageData[1];
const singleDetail = mainData.split("&");

const flyFrom = singleDetail[0].substring(8);
const flyTo = singleDetail[1].substring(6);
const checkIn = singleDetail[2].substring(8);
const checkOut = singleDetail[3].substring(9);
const duration = singleDetail[4].substring(9);
const token = singleDetail[5].substring(6);
const price = singleDetail[6].substring(6);


console.log(token);
document.querySelector('h2.selected-price span.price').textContent += price;

document.querySelector('.flyFrom').textContent = flyFrom;
document.querySelector('.flyTo').textContent = flyTo;
formBooking.addEventListener('submit', postData);

function postData(event){
    event.preventDefault();
    let tickTock = setInterval(async () => {
        const bnum = formBooking.bags.options[formBooking.bags.selectedIndex].value;
        const adult = formBooking.adult.options[formBooking.adult.selectedIndex].value;
        const children = formBooking.children.options[formBooking.children.selectedIndex].value;
        const pnum = Number(adult) + Number(children);
        const baseurl = 'https://booking-api.skypicker.com/api/v0.1/check_flights?'; 
        const query = `v=2&booking_token=${token}&bnum=${bnum}&pnum=${pnum}&affily=picky_{market}&currency=USD&adults=${adult}&children=${adult}&infants=1`
        console.log(baseurl+query);
       
        const response = await fetch(baseurl + query);
        const data = await response.json();
        if(data.flights_checked && !data.flights_invalid){
            clearInterval(tickTock);
            window.location.assign(`http://127.0.0.1:5502/flight-booking-left-sidebar.html?v=2&booking_token=${token}&bnum=${bnum}&pnum=${pnum}&affily=picky_{market}&currency=USD&adults=${adult}&children=${children}&infants=1`)
            console.log(data);
            console.log(pnum);
        }
        if (data.flights_checked && data.flights_invalid) {
            clearInterval(tickTock);
            alert("Flight has expired or ticket has been sold out");
        }
    }, 5000);
   
    // fetch('https://booking-api.skypicker.com/api/v0.1/save_booking?v=2', {
    //     method: 'POST',
    //     headers : new Headers(),
    //     body:JSON.stringify({firstName:firstName, lastName:lastName, email:email, phoneNo:phoneNo, bookingDate:bookingDate})
    // }).then((res) => res.json())
    // .then((data) =>  console.log(data))
    // .catch((err)=>console.log(err))
}

    window.addEventListener('load', async () => {
        //api call to get the code of each location
        const base_location = "https://api.skypicker.com/locations";
        const query_locationFrom = `?term=${flyFrom}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name`;
        const response_locationFrom = await fetch(base_location + query_locationFrom);
        const data_locationFrom = await response_locationFrom.json();
        fromCode = data_locationFrom.locations[0].city.code;

        const query_locationTo = `?term=${flyTo}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name`;
        const response_locationTo = await fetch(base_location + query_locationTo);
        const data_locationTo = await response_locationTo.json();
        toCode = data_locationTo.locations[0].city.code;

        let queryResults = document.querySelector('.more-results');
        const base = "https://api.skypicker.com/flights";
        const query = `?flyFrom=${fromCode}&to=${toCode}&dateFrom=${checkIn}&dateTo=${checkOut}&partner=picky&curr=NGN`;
    
        const response = await fetch(base + query);
        
        const data = await response.json();
    
        console.log(data)
        // window.location.assign('http://127.0.0.1:5500/flight-search-result.html' + query)
        const searchResults = data.data;
        console.log(searchResults);
    
        const response2 = await fetch('https://api.skypicker.com/airlines');
        const airlines = await response2.json()
    
        // let queryResults = document.querySelector('.search-result .row');
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
    
            var displayElem = index >= 6 ? "d-none" : "";
            queryResults.innerHTML += `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 search-results ${displayElem}">
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
                        <a href="flight-detail-left-sidebar.html?flyFrom=${element.cityFrom}&flyTo=${element.cityTo}&checkIn=${checkIn}&checkOut=${checkOut}&duration=${element.fly_duration}&token=${element.booking_token}" class="btn btn-orange btn-block btn-lg">View More</a>
                    </div><!-- end grid-btn -->
                </div><!-- end f-grid-info -->
            </div><!-- end f-grid-block -->
        </div>`;
        });
       
    })
    
