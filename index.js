
const taskContainer = document.querySelector('.tasks')
const emptyState = document.querySelector('.empty-state');
const inputEl = document.getElementById('input-el');
const addBtn = document.querySelector('.btn');
const Tasklist = document.querySelector('.task-list');
const tasksListContainer = document.querySelector('.tasks-list-container');
const themeTogglebtn = document.querySelector('.theme-toggle');
const themeToggleIcon = document.querySelector('.theme-toggle-icon');
const inputContainer = document.querySelector('.input-container');
const inputFieldContainer = document.querySelector('.inputfield-container');



const counter = document.createElement('div');
counter.className = 'counter';
taskContainer.appendChild(counter);

addBtnVisibility();
loadTasks();


// //  empty state toggle

function toggleEmptyState(){
  if(Tasklist.children.length === 0){
    emptyState.style.display= 'block';
    emptyState.style.textAlign = 'center'
    counter.style.display = 'none'

  } else {
    emptyState.style.display= 'none';
    counter.style.display = 'block'
  }
}
toggleEmptyState();


function addTask(){
    const task = inputEl.value.trim();
   
    if(task){
     createListElement(task);
     inputEl.value = '';
     saveTasks();
    } else {
     alert('please enter a task')

    }
   toggleEmptyState()
   addBtnVisibility()
   updateCounter();
   
   }
   
   // create a list element
   
   function createListElement(task, completed=false) {
    let listItem = document.createElement('li');
    // listItem.textContent = task;
    listItem.classList.toggle('completed', completed)
    Tasklist.appendChild(listItem);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox',
    checkbox.checked = completed;

    let list = document.createElement('span');
    list.textContent = task;
    // list.style.textAlign ='center';
   
    let deleteItem = document.createElement('button');
    let deleteIcon = document.createElement('img');
    deleteIcon.src ='./assets/icons/close.svg';
    deleteIcon.className = 'deletebtn';
    deleteItem.className = 'delete';
   
    listItem.appendChild(checkbox);
    listItem.appendChild(list);
    deleteItem.appendChild(deleteIcon);
    
    listItem.appendChild(deleteItem);
   
   checkbox.addEventListener('change', function(){
    listItem.classList.toggle('completed', checkbox.checked);
    saveTasks();
    sortTasks();
    updateCounter();
   })
   
    deleteItem.addEventListener('click', function(){
     Tasklist.removeChild(listItem)
     saveTasks();
     toggleEmptyState();
    })
    // Tasklist.appendChild(listItem);
    sortTasks();
    updateCounter();

   }
   
  // event listeners 
  inputEl.addEventListener('input', addBtnVisibility)
   addBtn.addEventListener('click', addTask);
   inputEl.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
      addTask()
    }
   })


  //  sorting tasks

  function sortTasks(){
    let tasks = Array.from(Tasklist.children);

    tasks.sort((a,b) => a.classList.contains('completed') - b.classList.contains('completed'));

   tasks.forEach(task => Tasklist.appendChild(task));
  }
   
function updateCounter(){
  let totalTask = Tasklist.children.length;

  let completedTasks = Tasklist.querySelectorAll('li.completed').length;
  
  counter.textContent = `${completedTasks}/${totalTask} todos completed`
}

// button visbility

function addBtnVisibility(){
  if(inputEl.value.trim() != ''){
    addBtn.style.display = 'block';
  } else {
    addBtn.style.display = 'none'
  }
}

   // add list items to local storage
   
   function saveTasks() {
     const tasks =[];
     Tasklist.querySelectorAll('li').forEach(list => tasks.push({
      text: list.querySelector('span').textContent,
      completed: list.classList.contains('completed')
     }));
     
     localStorage.setItem('todolist', JSON.stringify(tasks));
   
   }
   
   // load taks
   
   function loadTasks(){
     let data = JSON.parse(localStorage.getItem('todolist'));
   
     if(!data) return;
   
     data.forEach(task => createListElement(task.text, task.completed));
     toggleEmptyState();

   }

  //  day and night mode

  function switchTheme(){
    document.body.classList.toggle('light-mode');


    if(document.body.classList.contains('light-mode')){
      themeToggleIcon.src ='./assets/icons/dark-mode.svg';
      dayMode()
    } else {
      themeToggleIcon.src ='./assets/icons/light-mode.svg';
      nightMode()
    }
  }

  themeTogglebtn.addEventListener('click', switchTheme)

  function dayMode(){
    inputEl.style.backgroundColor= 'white';
    inputContainer.style.backgroundColor='gray';
    inputEl.style.color='black';
    inputFieldContainer.style.backgroundColor = 'white';
    inputFieldContainer.style.color = 'black'
    
    Tasklist.querySelectorAll('li').forEach(list=> {
      list.querySelector('span').style.color = 'black'
      
    }
    )
    
  }

  function nightMode(){
    inputEl.style.backgroundColor= 'rgb(33, 31, 31)';
    inputContainer.style.backgroundColor='black';
    inputEl.style.color='rgb(243, 238, 235)';
    inputFieldContainer.style.backgroundColor = 'rgb(33, 31, 31)';
    inputFieldContainer.style.color = 'rgb(243, 238, 235)'
    listItem.style.color ='rgb(243, 238, 235)'
  }

































