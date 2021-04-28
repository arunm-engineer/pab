let colorElemArr = document.querySelectorAll(".filter-colors-container");
let mainContainerBox = document.querySelector(".main-container");


for (let i = 0;i < colorElemArr.length;i++) {
    colorElemArr[i].addEventListener("click", function() {
        console.log('clicked');
        let childElemsArr = colorElemArr[i].children;
        let colorClassArr = childElemsArr[0].classList;
        mainContainerBox.style.backgroundColor = colorClassArr[0];
    });
}

let addModal = document.querySelector(".add");

addModal.addEventListener("click", function() {
    console.log('clicked');
    // modal container - create & set attribute
    let modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // task container - create & set attribute
    let taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    let textArea = document.createElement("textarea");
    textArea.setAttribute("placeholder", "Enter your task here");
    taskContainer.appendChild(textArea);

    // priority container - create & set attribute
    let priorityContainer = document.createElement("div");
    priorityContainer.classList.add("priority-container");

    let priorityColorContainer = document.createElement("div")
    priorityColorContainer.classList.add("priority-color-container");
    
    let priorityColor = document.createElement("div");
    priorityColor.classList.add("pink", "priority-color");
    priorityColorContainer.appendChild(priorityColor);
    
    priorityColor = document.createElement("div");
    priorityColor.classList.add("lightblue", "priority-color");
    priorityColorContainer.appendChild(priorityColor);

    priorityColor = document.createElement("div");
    priorityColor.classList.add("lightgreen", "priority-color");
    priorityColorContainer.appendChild(priorityColor);

    priorityColor = document.createElement("div");
    priorityColor.classList.add("black", "priority-color");
    priorityColorContainer.appendChild(priorityColor);
    
    priorityContainer.appendChild(priorityColorContainer);

    modalContainer.appendChild(taskContainer);
    modalContainer.appendChild(priorityContainer);

    //Add modal to main-container box
    mainContainerBox.appendChild(modalContainer);

});
