let input = document.querySelector('.input');
let add = document.querySelector('.add');
let tasks = document.querySelector('.tasks');
let taskList = [];
function createTask(p = input.value){
    let task = document.createElement('div');
    let paragraph = document.createElement('p');
    let paragraphText = document.createTextNode(p);
    let btn = document.createElement('div');
    let btnText = document.createTextNode('Delete');
    task.style.cssText = `background-color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    margin-bottom: 10px;`;
    paragraph.style.cssText = `font-size: 16px;
    margin: 0;`;
    btn.style.cssText = `color: white;
    background-color: red;
    border-radius: 6px;
    padding: 4px 6px;
    cursor: pointer;`;
    paragraph.appendChild(paragraphText);
    btn.appendChild(btnText);
    task.appendChild(paragraph);
    task.appendChild(btn);
    tasks.appendChild(task);
    taskList.push(paragraph.innerHTML);
    window.localStorage.setItem('tasks', taskList);
    btn.addEventListener('click',() => {
        btn.parentElement.remove();
        console.log(paragraph.innerHTML, taskList.indexOf(paragraph.innerHTML));
        if(taskList.indexOf(paragraph.innerHTML) > -1){
            taskList.splice(taskList.indexOf(paragraph.innerHTML),1);
        }
        window.localStorage.setItem('tasks', taskList);
        if(taskList.length == 0){
            window.localStorage.removeItem('tasks');
        }
    });
    
}
add.addEventListener('click', function(){
    if(input.value != ""){
        createTask();
        input.value = "";
    }
})
if(window.localStorage.length > 0){
    let t = window.localStorage.getItem('tasks');
    t = t.split(',');
    for(let i = 0; i<t.length;i++){
        createTask(t[i]);
    }
    
}