let inputBox = document.querySelector(".input-box");
let taskList = document.querySelector(".task-list");
let tasksArr = [];

if (localStorage.getItem("allTasks")) {
    let strArr = localStorage.getItem("allTasks");
    tasksArr = JSON.parse(strArr);
    for (let i = 0;i < tasksArr.length;i++) {
        let task = tasksArr[i];
        let taskElem = document.createElement("li");  //create an element of li tag
        taskElem.setAttribute("class", "task");
        taskElem.innerText = task;
        taskList.appendChild(taskElem);

        inputBox.value = "";

        taskElem.addEventListener("dblclick", function() {
            let elem = taskElem.innerText;
            let elemIdx = tasksArr.indexOf(elem);
            tasksArr.splice(elemIdx, 1);
            let strArr = JSON.stringify(tasksArr);
            localStorage.setItem("allTasks", strArr);

            taskElem.remove(); //remove this element on double click event
        });
    }
}

console.log("Before");

// addEventListener is an async function
inputBox.addEventListener("keypress", function(e) {   // e in function -> is the object of the event
    console.log("Key press was called");
    if (e.code == "Enter") {
        // console.log(inputBox.value);
        let task = inputBox.value;

        let taskElem = document.createElement("li");  //create an element of li tag
        taskElem.setAttribute("class", "task");
        taskElem.innerText = task;
        tasksArr.push(task);
        let strArr = JSON.stringify(tasksArr);
        localStorage.setItem("allTasks", strArr);

        taskList.appendChild(taskElem);  //Add a element in a selector

        inputBox.value = ""; //Empty the input value after task is added

        taskElem.addEventListener("dblclick", function() {
            let elem = taskElem.innerText;
            let elemIdx = tasksArr.indexOf(elem);
            tasksArr.splice(elemIdx, 1);
            let strArr = JSON.stringify(tasksArr);
            localStorage.setItem("allTasks", strArr);

            taskElem.remove(); //remove this element on double click event
        });
    }
});

console.log("After");