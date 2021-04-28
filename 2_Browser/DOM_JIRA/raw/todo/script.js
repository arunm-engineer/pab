let inputBox = document.querySelector(".input-box");
let taskList = document.querySelector(".task-list");

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
        taskList.appendChild(taskElem);  //Add a element in a selector

        inputBox.value = ""; //Empty the input value after task is added

        taskElem.addEventListener("dblclick", function() {
            taskElem.remove(); //remove this element on double click event
        })
    }
});

console.log("After");