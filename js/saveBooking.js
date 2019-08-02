let url = window.location.href;

const pageData = url.split("?")
const mainData = pageData[1];
const singleDetail = mainData.split("&");
const token = singleDetail[1].substring(14);
const bnum = singleDetail[2].substring(5);
const pnum = singleDetail[3].substring(5);
const adult = singleDetail[6].substring(7);
const children = singleDetail[7].substring(9);
const saveBooking = document.getElementById('saveBooking');

console.log(adult, children, pnum)

saveBooking.addEventListener('submit',SaveBooking_)

function SaveBooking_(event){
    event.preventDefault();
    let tickTock = setInterval(async () => {
        const baseurl = 'https://booking-api.skypicker.com/api/v0.1/check_flights?'; 
        const query = `v=2&booking_token=${token}&bnum=${bnum}&pnum=${pnum}&affily=picky_{market}&currency=USD&adults=${adult}&children=${children}&infants=1`
        console.log(baseurl+query);
       
        const response = await fetch(baseurl + query);
        const data = await response.json();
        if(data.flights_checked && !data.flights_invalid){
            clearInterval(tickTock);
            console.log(data);
    
            const flightID = data.flights[0].id;
            let bd = {}
            bd[flightID] = {"1":1}
            fetch('https://booking-api.skypicker.com/api/v0.1/save_booking?v=2', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    lang: "en",
                    bags: 1,
                    passengers: [
                      {
                        name: "John",
                        surname: "Smith",
                        title: "mr",
                        phone: "+44 44857282842",
                        birthday: 783657600,
                        expiration: 1639958400,
                        cardno: "D25845222",
                        nationality: "SE",
                        email: "email.address@gmail.com",
                        category: "adults",
                        hold_bags: bd
                      }
                    ],
                    locale: "en",
                    currency: "usd",
                    booking_token: token,
                    affily: "picky",
                    booked_at: "picky",
                    user_id: "test",
                    secret_token: "test",
                    immediate_confirmation: false
                  }), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .then(response => console.log('Success:', JSON.stringify(response)))
              .catch(error => console.error('Error:', error));
           
        }
        if (data.flights_checked && data.flights_invalid) {
            clearInterval(tickTock);
            alert("Flight has expired or ticket has been sold out");
        }
    }, 5000);
   
   
}