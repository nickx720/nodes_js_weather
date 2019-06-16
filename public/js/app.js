console.log('I am from the client side');

const fetchData = (str) => fetch('http://localhost:8080/weather?address=' + str).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.forecast;
            messageTwo.textContent = data.location;
        }
    })
})

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    if (location === '') {
        messageOne.textContent = 'Please provide non empty value';
        messageTwo.textContent = '';
    } else {
        messageOne.textContent = 'Loading';
        messageTwo.textContent = '';
        fetchData(location);
    }
});