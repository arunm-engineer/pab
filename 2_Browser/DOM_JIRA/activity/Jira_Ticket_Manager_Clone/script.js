let colorElemArr = document.querySelectorAll(".filter-colors-container");
let mainContainerBox = document.querySelector(".main-container");
let modalContainer = document.querySelector(".modal-container");
let addBtn = document.querySelector(".add");
let priorityColor = document.querySelectorAll(".priority-color");
let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let cColor = colors[colors.length-1];
let taskArea = document.querySelector(".task-area");
let collectiveTicketContainer = document.querySelector(".collective-ticket-container");
let flag = false;

for (let i = 0;i < colorElemArr.length;i++) {
    colorElemArr[i].addEventListener("click", function() {
        console.log('clicked');
        let childElemsArr = colorElemArr[i].children;
        let colorClassArr = childElemsArr[0].classList;
        mainContainerBox.style.backgroundColor = colorClassArr[0];
    });
}

addBtn.addEventListener("click", function() {
    if (flag == false) {
        setToDefault();
        modalContainer.style.display = "flex";
    }
    flag = !flag;
});

taskArea.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let task = taskArea.value;
        createTicket(task, cColor);
        setToDefault();
        flag = false;        
        // console.log("task", task, "color", cColor);    
    }
})

for (let i = 0;i < priorityColor.length;i++) {
    priorityColor[i].addEventListener("click", function() {
        priorityColor.forEach(function(colorElem) {
            colorElem.classList.remove("border");
        });
        priorityColor[i].classList.add("border");
        cColor = priorityColor[i].classList[0];
    });
}

function createTicket(task, color) {
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket-container");
    ticket.innerHTML = `
                        <div class="head-color ${color}"></div>
                        <div class="ticket-sub-container">
                            <h2 class="task-id">#sampleId</h2>
                            <p class="task-desc" contenteditable="true">${task}</p>
                        </div>
                        `;
    collectiveTicketContainer.appendChild(ticket);
    let tracker = 0;
    
    ticket.addEventListener("click", function() {
        tracker = tracker%colors.length;  //To keep track of colors
        let colorHeader = ticket.querySelector(".head-color");
        let curColor = colors[tracker];
        let prevColor = colorHeader.classList[1];
        if (prevColor === curColor) {
            tracker++;
            curColor = colors[tracker];
        }
        colorHeader.classList.remove(prevColor);
        colorHeader.classList.add(curColor);
        tracker++;
    });
}

function setToDefault() {
    modalContainer.style.display = "none";
    taskArea.value = "";
    cColor = colors[colors.length-1];
    priorityColor.forEach(function(colorElem) {
        colorElem.classList.remove("border");
    });
    priorityColor[priorityColor.length-1].classList.add("border");
}






// let addModal = document.querySelector(".add");

// addModal.addEventListener("click", function() {
//     console.log('clicked');
//     // modal container - create & set attribute
//     let modalContainer = document.createElement("div");
//     modalContainer.classList.add("modal-container");

//     // task container - create & set attribute
//     let taskContainer = document.createElement("div");
//     taskContainer.classList.add("task-container");
//     let textArea = document.createElement("textarea");
//     textArea.setAttribute("placeholder", "Enter your task here");
//     taskContainer.appendChild(textArea);

//     // priority container - create & set attribute
//     let priorityContainer = document.createElement("div");
//     priorityContainer.classList.add("priority-container");

//     let priorityColorContainer = document.createElement("div")
//     priorityColorContainer.classList.add("priority-color-container");
    
//     let priorityColor = document.createElement("div");
//     priorityColor.classList.add("pink", "priority-color");
//     priorityColorContainer.appendChild(priorityColor);
    
//     priorityColor = document.createElement("div");
//     priorityColor.classList.add("lightblue", "priority-color");
//     priorityColorContainer.appendChild(priorityColor);

//     priorityColor = document.createElement("div");
//     priorityColor.classList.add("lightgreen", "priority-color");
//     priorityColorContainer.appendChild(priorityColor);

//     priorityColor = document.createElement("div");
//     priorityColor.classList.add("black", "priority-color");
//     priorityColorContainer.appendChild(priorityColor);
    
//     priorityContainer.appendChild(priorityColorContainer);

//     modalContainer.appendChild(taskContainer);
//     modalContainer.appendChild(priorityContainer);

//     //Add modal to main-container box
//     mainContainerBox.appendChild(modalContainer);

// });
