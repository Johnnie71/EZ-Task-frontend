
document.addEventListener("DOMContentLoaded", () => {

	const baseUrl = "http://localhost:3000/api/v1/tasks/"

	const getTasks = () => {
		   
		fetch(baseUrl)
		.then(resp => resp.json())
		.then(tasks => addTasks(tasks))
	} 

	const addTasks = (tasks) => {
		const taskUl = document.querySelector('#list')
		taskUl.innerHTML = ""
		for(const task of tasks){
			addTaskToDom(task)
		}
	}


	const addTaskToDom = (task) => {
		const taskUl = document.querySelector('#list')
		const taskDiv = document.createElement('div')
		taskDiv.classList.add('task-div')
		taskDiv.dataset.id = task.id
		const taskP = document.createElement('li')
		taskP.innerHTML =`
		<strong>${task.subject}</strong>
		<p>${task.content}</p>
		<div class="edit" data-id="${task.id}">✏️</div>
		<div class="delete" data-id="${task.id}">x</div>
		`
			taskDiv.appendChild(taskP)
		 taskUl.appendChild(taskDiv)

	  }
		
	   

	   const submitHandler = () => {
		   
		   document.addEventListener('submit', e => {
			if(e.target.matches('.task-form')){

				e.preventDefault()
				const form = e.target
 
				const subject = form.subject.value
				const content = form.content.value 
				
				const newNote = {subject: subject, content: content}
				
 
				const options = {
					method: "POST",
					headers: {
						"content-type": "application/json",
						"accept": "application/json"
					},
					body: JSON.stringify(newNote)
				}
 
				fetch(baseUrl, options)
				.then(resp => resp.json())
				.then(task => {addTaskToDom(task)})
				 document.querySelector('.task-form').reset()

				

			}
			else if(e.target.matches('.edit-form')){
				e.preventDefault()
				let editForm = e.target
				let taskId = editForm.dataset.id

				let subject = editForm.subject.value
				let content = editForm.content.value
				
				let editedTask = {subject: subject, content: content}
				
				let options = {
					method: "PATCH",
					headers: {
						"content-type": "application/json",
						"accept": "application/json"
					},
					body: JSON.stringify(editedTask)
				}

				fetch(baseUrl + taskId, options)
				.then(resp => resp.json())
				.then(getTasks)

			
				     let addTask = false

					 let editContainer = document.querySelector('.edit-form')

					 addTask = !addTask
					 if (addTask) {
					 editContainer.style.display = "none";
					 } else {
					 editFormContainer.style.display = "block";
					 }
			   }
			
		  })
		}
		
		
	   
	
		

		   const clickHandler = () => {
			   document.addEventListener('click', e => {
				if(e.target.matches('.delete')){
					let button = e.target
					let taskId = button.dataset.id

					let options = {
					 method: "DELETE"
					}

					fetch(baseUrl + taskId, options)
					.then(resp => resp.json())
					.then(_data => {
						e.target.parentElement.parentElement.remove()
					})
				 }
				
				else if(e.target.matches('.edit')){
					 let edButton = e.target
					 let taskId = edButton.dataset.id
					 let subject = edButton.parentElement.children[0].textContent
					 let content = edButton.parentElement.children[1].textContent
	
					 let form = document.querySelector('.edit-form')
					
					 form.subject.value = subject
					 form.content.value = content

					 form.dataset.id = taskId

					let addTask = false;

					let editContainer = document.querySelector('.edit-form')

					addTask = !addTask;
					if (addTask) {
					editContainer.style.display = "block";
					} else {
					editFormContainer.style.display = "none";
					}

				}	 

				  else if (e.target.matches('.seeNotes')){

					  getTasks();

					  let addNewForm = document.querySelector('.task-form')

						let addTask = false;


						addTask = !addTask;
						if (addTask) {
						addNewForm.style.display = "none";
						} else {
						addNewForm.style.display = "block";
					     }

					
				

					 }
					 else if(e.target.matches(".hideNotes")){
						const taskUl = document.querySelector('#list')
						taskUl.innerHTML = ''

					
					 }
					 else if(e.target.matches('.seeForm')){
						 
						let addNewForm = document.querySelector('.task-form')

						let addTask = false;


						addTask = !addTask;
						if (addTask) {
						addNewForm.style.display = "block";
						} else {
						addNewForm.style.display = "none";
					     }
						

					 }

			       }
			      ) 
                 } 
			


	   
		clickHandler();
		submitHandler();
	    


})



// var listArr = [];
// var inputDOM = document.querySelector('#add-list');
// var button = document.querySelector('#submit');
// var lists = document.querySelector('#list');
// var lis;
// var text;
// var arrPos;
// var update;

// button.addEventListener('click', function(e){
// 	e.preventDefault();
// 	listArr.push(inputDOM.value);
// 	inputDOM.value = "";
// 	populateList();
// })

// // listen to li clicks
// lists.addEventListener('click', checkClick);

// function populateList() {
// 	lists.innerHTML = listArr.map(item => {
// 		return `<li>
// 				<div class="item">${item}</div><div class="delete">x</div>
// 			</li>`
// 	}).join('');
// 	lis = Array.from(document.querySelectorAll('ul#list li'));
// }

// function checkClick (e) {
// 	if (e.target.className == 'item') {
// 		updateItem(e);
// 		populateList();
// 	} else if(e.target.className == 'delete') {
// 		deleteItem(e);
// 		populateList();
// 	}
// }

// function deleteItem (e) {
// 	text = e.target.parentNode.childNodes[1].innerHTML;
// 	arrPos = listArr.indexOf(text);
// 	listArr.splice(arrPos,1);
// }

// function updateItem (e) {
// 	update = prompt("Update Item", "enter new value");
// 	text = e.target.parentNode.childNodes[1].innerHTML;
// 	arrPos = listArr.indexOf(text);
// 	listArr[arrPos] = update;
// }