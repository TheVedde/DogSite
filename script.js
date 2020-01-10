let request = new XMLHttpRequest();
let dogs;
let breed = "";
window.onload=getAllDogs();

function getAllDogs () {
    let target = "https://dog.ceo/api/breeds/list";
    request.open('GET', target, true);
    request.onload = function () {
        let data = JSON.parse(this.response);
        dogs = data[Object.keys(data)[0]];

    };
    request.send();
}

function f(value) {
    console.log(value);
    breed = value;


}

function populate() {
    let text = "";
   for(let dog of dogs) {
       text += "<option onclick= \"f('" + dog + "')\"   value=" + dog + ">" + dog + " </option>";
   }

    document.getElementById("dogSelect").innerHTML = text;
}

function getRndDog() {

    let target;
    if(breed === "" || breed == null) {
       target = "https://dog.ceo/api/breeds/image/random";
    } else target = "https://dog.ceo/api/breed/" + breed + "/images/random";

    request.open('GET', target, true);
    request.onload = function () {
        let data = JSON.parse(this.response);
        let link = data[Object.keys(data)[0]];
        let imgSource= "<img src= " + link + " class=\"mx-auto rounded img-thumbnail img-fluid\"alt=\"...\"srcset= " + link + " 500w," + link + " 800vw," + link + " sizes=\" (max-width:500px)80vw,(max-width:750px)10vw,600px\">";

        document.getElementById("dogframe").innerHTML = imgSource
    }

    request.send();
}