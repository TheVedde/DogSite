let request = new XMLHttpRequest();
let breeds;
let breed = "";
let selectedSubbreed;
 window.onload=getAllDogs;

// Gets all the dogs into an array and fetches it when the window loads.
function getAllDogs () {
    let target = "https://dog.ceo/api/breeds/list";
    Quester.get(target, () => {
        breeds = JSON.parse(Quester._requestObject.response).message;
    });
}
//resets value to use and fetches all subbreed given in a breed
function subbreedPicker(value) {
    breed = value;
    selectedSubbreed = "";
    let text = "";
    let target = "https://dog.ceo/api/breed/"+ value +"/list";
    Quester.get(target, () => {
        let subbreeds = JSON.parse(Quester._requestObject.response).message;
        for (let subbreed of subbreeds) {
            if (subbreeds.length === 1) {
                text = "";
            }
            else text += "<input type='radio' onclick=\"subbreedAssigner('"+ subbreed+"')\" name='subbreed' value='" + subbreed + "'> " + subbreed + "  <br>";
        }
        document.getElementById("subbreeds").innerHTML = text;
    });
}
//sets the selected sub breed value.
function subbreedAssigner(subbreed) {
    selectedSubbreed = subbreed;
}
//populates the advanced seach list by inserting the breed names into the list.
function listPopulate() {
    document.getElementById("subbreeds").innerHTML = "";
    breed = "";
    let text = "";
   for(let breed of breeds) {
       text += "<option onclick= \"subbreedPicker('" + breed + "')\"   value=" + breed + ">" + breed + " </option>";
   }
    text += "<option onclick= 'breed = \"\"; document.getElementById(\"subbreeds\").innerHTML = \"\";' value=\"\" selected> none </option>";
    document.getElementById("dogSelect").innerHTML = text;
}
//gets a random dog. either by specific or not.
function getRndDog() {
    let target;
    if( breed !== "") {
        target = "https://dog.ceo/api/breed/" + breed + "/images/random";
        if(selectedSubbreed !== "") {
            target = "https://dog.ceo/api/breed/" + breed + "/" + selectedSubbreed +"/images/random";
        }
    }
    else target = "https://dog.ceo/api/breeds/image/random";
    Quester.get(target, () => {
       let link = JSON.parse(Quester._requestObject.response).message;
       let imgSource= "<img srcset='" + link +  " 500w, "+ link +" 800w, "+ link +"' sizes='(max-width:500px, max-height:500px)80vw,(max-width:350px, max-height:500px)10vw,1000px' src= " + link + " class='mx-auto rounded img-thumbnail img-fluid' alt='...' >";
       document.getElementById("dogframe").innerHTML = imgSource;
    });
}