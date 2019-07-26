const formBooking = document.getElementById('postData');
formBooking.addEventListener('submit', postData);

function postData(event){
    event.preventDefault();

    let firstName = formBooking.firstName.value;
    let lastName = formBooking.lastName.value;
    let email = formBooking.email.value;
    let phoneNo = formBooking.phoneNo.value;
    let bookingDate = formBooking.phoneNo.value;


    fetch('https://localhost/api', {
        method: 'POST',
        headers : new Headers(),
        body:JSON.stringify({firstName:firstName, lastName:lastName, email:email, phoneNo:phoneNo, bookingDate:bookingDate})
    }).then((res) => res.json())
    .then((data) =>  console.log(data))
    .catch((err)=>console.log(err))
}




let url = window.location.href;

const pageData = url.split("?")
const mainData = pageData[1];
const singleDetail = mainData.split("&");

const flyFrom = singleDetail[0].substring(8);
const flyTo = singleDetail[1].substring(6);
const duration = singleDetail[4].substring(9);

document.querySelector('.flyFrom').textContent = flyFrom;
document.querySelector('.flyTo').textContent = flyTo;


console.log(flyFrom, flyTo, duration);


