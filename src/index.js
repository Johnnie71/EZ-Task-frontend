// document.addEventListener("DOMContentLoaded", () =>{

const baseUrl = "http://localhost:3000/api/v1/tasks"
	
   const getTasks = () => {
	   
	   fetch(baseUrl)
	   .then(resp => resp.json())
	   .then(console.log)
   } 
   getTasks();

// });

var listArr = [];
var inputDOM = document.querySelector('#add-list');
var button = document.querySelector('#submit');
var lists = document.querySelector('#list');
var lis;
var text;
var arrPos;
var update;
button.addEventListener('click', function(e){
	e.preventDefault();
	listArr.push(inputDOM.value);
	inputDOM.value = "";
	populateList();
})

// listen to li clicks
lists.addEventListener('click', checkClick);

function populateList() {
	lists.innerHTML = listArr.map(item => {
		return `<li>
				<div class="item">${item}</div><div class="delete">x</div>
			</li>`
	}).join('');
	lis = Array.from(document.querySelectorAll('ul#list li'));
}

function checkClick (e) {
	if (e.target.className == 'item') {
		updateItem(e);
		populateList();
	} else if(e.target.className == 'delete') {
		deleteItem(e);
		populateList();
	}
}

function deleteItem (e) {
	text = e.target.parentNode.childNodes[1].innerHTML;
	arrPos = listArr.indexOf(text);
	listArr.splice(arrPos,1);
}

function updateItem (e) {
	update = prompt("Update Item", "enter new value");
	text = e.target.parentNode.childNodes[1].innerHTML;
	arrPos = listArr.indexOf(text);
	listArr[arrPos] = update;
}