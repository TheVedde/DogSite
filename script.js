let request = new XMLHttpRequest();
let breeds;
let breed = "";
let selectedSubbreed = "";
window.onload=getAllDogs();

function getAllDogs () {
    let target = "https://dog.ceo/api/breeds/list";
    request.open('GET', target, true);
    request.onload = function () {
        let data = JSON.parse(this.response);
        breeds = data[Object.keys(data)[0]];
    };
    request.send();
}
function f(value) {
    breed = value;
    selectedSubbreed = "";
    let text = "";
    let target = "https://dog.ceo/api/breed/"+ value +"/list";

    request.open('GET', target, true);
    request.onload = function () {
        let data = JSON.parse(this.response);
        let subbreeds = data[Object.keys(data)[0]];
            for (let subbreed of subbreeds) {
                text += "<input type='radio' onclick=\"test('"+ subbreed+"')\" name='subbreed' value='" + subbreed + "'> " + subbreed + "  <br>";
            }
            document.getElementById("subbreeds").innerHTML = text;
        };
    request.send();
}
function test(vale) {
        console.log(vale);
        selectedSubbreed = vale;
}
function populate() {
    document.getElementById("subbreeds").innerHTML = "";
    breed = "";
    let text = "";
   for(let breed of breeds) {
       text += "<option onclick= \"f('" + breed + "')\"   value=" + breed + ">" + breed + " </option>";
   }
    text += "<option onclick= 'breed = \"\"; document.getElementById(\"subbreeds\").innerHTML = \"\";' value=\"\" selected> none </option>";
    document.getElementById("dogSelect").innerHTML = text;
}
function getRndDog() {
    let target;
    if( breed !== "") {
        target = "https://dog.ceo/api/breed/" + breed + "/images/random";
        if(selectedSubbreed !== "") {
            target = "https://dog.ceo/api/breed/" + breed + "/" + selectedSubbreed +"/images/random";
        }
    }
    else target = "https://dog.ceo/api/breeds/image/random";
    request.open('GET', target, true);
    request.onload = function () {
        let data = JSON.parse(this.response);
        let link = data[Object.keys(data)[0]];
        let imgSource= "<img srcset='" + link +  " 500w, "+ link +" 800w, "+ link +"' sizes='(max-width:500px, max-height:500px)80vw,(max-width:350px, max-height:500px)10vw,1000px' src= " + link + " class='mx-auto rounded img-thumbnail img-fluid' alt='...' >";

        document.getElementById("dogframe").innerHTML = imgSource
    };
    request.send();
}

