var request = new XMLHttpRequest();

request.open('GET', 'https://dog.ceo/api/breeds/list', true);

request.onload = function () {
    let data = JSON.parse(this.response);


    function myFunction(value) {
        text += "<li>" + value + "</li>";
    }

    let dogs = data[Object.keys(data)[0]];

    dogs.forEach(dog => {
       console.log(dog);
        text = "<ul>";
        dogs.forEach(myFunction);
        text += "</ul>";
        document.getElementById("root").innerHTML = text;
    });
};


request.send();