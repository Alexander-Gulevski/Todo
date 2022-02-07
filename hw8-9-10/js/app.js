///создание нового узла
function builder(par, teg, cl ){
    let findParent = document.querySelector(par);
    let createTeg = document.createElement(teg);
    createTeg.classList.add(cl);
    return  findParent.appendChild(createTeg);
}
function find(par){
    return  document.querySelectorAll(par);
}
/// основные дивы для шапки
builder(".todo","div","form");
builder(".form","button","btn");
builder(".form","input","todo__input");
builder(".form","button","btn");

///кнопки
let findBtn = find(".btn");
findBtn[0].innerHTML = 'delete all';
findBtn[0].setAttribute('type','button');
findBtn[0].setAttribute('id','deleteAll');

findBtn[1].innerHTML = 'add';
findBtn[1].setAttribute('type','submit');
findBtn[1].setAttribute('id','add');

/// плейсхолдер
let inputPlaceholder = document.querySelector('.todo__input');
inputPlaceholder.setAttribute('placeholder', 'Enter todo ...');
inputPlaceholder.setAttribute('type', 'text');
inputPlaceholder.setAttribute('id','td__input');
inputPlaceholder.focus();

find(".todo__input")[0].setAttribute('type', 'text');

/// массив в локальное хранилище и назад
let tasks = "";
!localStorage.tasks ? tasks = []: tasks = JSON.parse(localStorage.getItem('tasks'));
/// объект с задачами
function Task(desription){
    this.desription = desription;
    this.completed = false;
}
///шаблон для одного task
let todoItemElements = [];
const createTemplate = (task, index) => {
    return `<div class="todo todo-item ${task.completed ? 'checked' :''}">
    <div class="description"> ${task.desription} </div>
    <div class="buttons">
        <input onclick = "completeTask(${index})" type="checkbox" class="btn-complete" ${task.completed ? 'checked' :''}>
        <button onclick = "deleteTask(${index})" class="btn-delete btn-dell"></button>
    </div>
</div>`;
};
///функция добавления таска
const todosWrapper = document.querySelector('.todos-wrapper');
const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if (tasks.length > 0){
        tasks.forEach((el, index) => {
            todosWrapper.innerHTML += createTemplate(el, index) ;
        });
        todoItemElements = document.querySelectorAll('.todo-item');
    } 
};
fillHtmlList();


/// функция перевода в джейсон и добавления в локальное хранилище полученного массива с объектами
const updateLocal = () => {localStorage.setItem('task',JSON.stringify(tasks))};
///добавляет класс чекед
const completeTask = index =>{
    console.log(index)
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todoItemElements[index].classList.add('checked');
    } else {
        todoItemElements[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

let todoInput = document.getElementById("td__input");
let addTaskBtn = document.getElementById('add');
    addTaskBtn.addEventListener('click',() => {
        tasks.push(new Task(todoInput.value));//пушит обекты в массив
        updateLocal();//добавляет в локальное хранилище
        fillHtmlList();
        todoInput.value = '';
    })
///удалить один таск
const deleteTask = index =>{
    tasks.splice(index, 1);
    updateLocal();    
    fillHtmlList();
}
const deleteAllTask = () =>{
    tasks = [];
    updateLocal();    
    fillHtmlList();
}
document.querySelector("#deleteAll").addEventListener('click', deleteAllTask);
