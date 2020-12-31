const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#m1');
const messageTwo = document.querySelector('#m2');
const messageThree = document.querySelector('#m3');
const messageFour = document.querySelector('#m4');

const fetchData = function(location) {
    const url = `/weather?address=${location}`;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            }else {
                messageOne.textContent   = data.location;
                messageTwo.textContent   = data.forecast;
                messageThree.textContent = `Current Temparature: ${data.temperature} degees Centigrade`
                messageFour.textContent  = `Feels like ${data.feelslike} degees Centigrade`
            }
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;
    fetchData(location);
})