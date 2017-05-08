var body = document.body;
var houseList = document.createElement('div');
houseList.className = 'houseList';
houseList.style.marginTop = '60px';
body.getElementsByClassName('builder')[0].appendChild(houseList);

var remove = document.createElement('button');
remove.className = 'remove';
remove.innerText = 'Delete previous';
body.getElementsByClassName('add')[0].parentNode.appendChild(remove);

var add = body.getElementsByTagName('button')[0];
var deleteButton = body.getElementsByClassName('remove')[0];
var submitButton = body.getElementsByTagName('button')[2];

add.onclick = function(event) {
  event.preventDefault();

  var ageElement = document.getElementsByName('age')[0];
  var relElement = document.getElementsByName('rel')[0];
  var smokerElement = document.getElementsByName('smoker')[0];
  var age;
  var rel = relElement.value;
  var smoker = smokerElement.checked;

  if (ageElement.value.length > 0 && !ageElement.value.match(/[^0-9]/g)) {
    age = JSON.parse(ageElement.value);
  }

  if ((typeof age === 'number' && age > 0) && rel !== "") {
    var classNames = ['age', 'relationship', 'smoker'];
    var props = [age, rel, smoker];

    //Clear the field after entering
    ageElement.value = "";
    relElement.value = "";
    smokerElement.checked = false;

    var people = document.createElement('div');
    people.className = 'people';
    people.style.marginBottom = '50px';
    people.style.border = 'solid';

    props.forEach(function(value, index) {
      var paragraph = document.createElement("p");
      var className = classNames[index];
      paragraph.className = className;
      paragraph.innerText = className + ': ' + value;
      people.appendChild(paragraph);
    });

    houseList.insertBefore(people, houseList.childNodes[0]);
    console.log(houseList.childNodes);
    console.log(houseList.childNodes.length);
  } else {
    //alert("Please provide an age or relationship");
    if (ageElement.value === 0 || !ageElement.value) {
      alert("Please enter in the appropriate age");
    }
    if (!relElement.value) {
      alert("Please enter in a relationship");
    }
  }
};

deleteButton.onclick = function(event) {
  event.preventDefault();
  var previous = document.getElementsByClassName('houseList')[0].childNodes[0];
  if (previous) {
    previous.remove();
  }
};

submitButton.onclick = function(event) {
  event.preventDefault();

  var peopleElement = houseList.childNodes;
  var peopleData = [];
  for (var x = 0; x < peopleElement.length;) {
    var person = peopleElement[x].childNodes;
    peopleData.push({
      age: person[0],
      rel: person[1],
      smoker: person[2]
    });
    body.getElementsByClassName('remove')[0].click();
  }
};