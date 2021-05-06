"use strict";

let colorElemArr = document.querySelectorAll(".filter-colors-container");
let mainContainerBox = document.querySelector(".main-container");
let modalContainer = document.querySelector(".modal-container");
let addBtn = document.querySelector(".add");
let priorityColor = document.querySelectorAll(".priority-color");
let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let cColor = colors[colors.length - 1];
let taskArea = document.querySelector(".task-area");
let collectiveTicketContainer = document.querySelector(".collective-ticket-container");
let removeBtn = document.querySelector(".remove");
let addFlag = false;
let removeFlag = false;
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";
let ticketsArr = [];


if (localStorage.getItem("availableTickets")) {  //Create previously saved tickets from local storage on page
    let strTicketsArr = localStorage.getItem("availableTickets");
    ticketsArr = JSON.parse(strTicketsArr);
    for (let i = 0; i < ticketsArr.length; i++) {
        let ticketObj = ticketsArr[i];
        createTicket(ticketObj.task, ticketObj.color, ticketObj.id);
    }
}

addBtn.addEventListener("click", function () {
    if (addFlag == false) {
        modalContainer.style.display = "flex";
    }
    else {
        setToDefault();
    }
    addFlag = !addFlag;
});

removeBtn.addEventListener("click", function () {
    removeFlag = !removeFlag;  //Switch between delete action and non-delete
});

taskArea.addEventListener("keydown", function (e) {  //After modal data is set, create tickets
    if (e.key === "Enter") {
        let task = taskArea.value;
        createTicket(task, cColor);
        setToDefault();
        addFlag = false;
        // console.log("task", task, "color", cColor);  
    }
});

for (let i = 0; i < priorityColor.length; i++) {  //Selecting color box in modal container (generic task)
    priorityColor[i].addEventListener("click", function () {
        priorityColor.forEach(function (colorElem) {
            colorElem.classList.remove("border");
        });
        priorityColor[i].classList.add("border");
        cColor = priorityColor[i].classList[0];
    });
}

for (let i = 0; i < colorElemArr.length; i++) {  //Filtering tickets according to toolbar priority actions
    colorElemArr[i].addEventListener("click", function () {  //Display only requested color tickets

        let childElemsArr = colorElemArr[i].children;
        let colorClassArr = childElemsArr[0].classList;
        let filterColor = colorClassArr[0];

        let filteredTicketsArr = ticketsArr.filter(function (ticketObj, idx) {
            return ticketObj.color === filterColor;
        });

        let crudTicketsArr = collectiveTicketContainer.children;
        for (let i = collectiveTicketContainer.children.length - 1; i >= 0; i--) {
            collectiveTicketContainer.removeChild(crudTicketsArr[i]);
        }

        filteredTicketsArr.forEach(function (ticketObj) {
            createTicket(ticketObj.task, ticketObj.color, ticketObj.id);
        });

    });

    colorElemArr[i].addEventListener("dblclick", function() {  //Display all requested color tickets
        let crudTicketsArr = collectiveTicketContainer.children;
        for (let i = collectiveTicketContainer.children.length - 1; i >= 0; i--) {
            collectiveTicketContainer.removeChild(crudTicketsArr[i]);
        }

        ticketsArr.forEach(function(ticketObj) {
            createTicket(ticketObj.task, ticketObj.color, ticketObj.id);
        });
    });
}

function createTicket(task, color, ticketID) {  //Create new tickets
    let id = ticketID || shortid();  //creating unique id from the cdn link of shortid
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket-container");
    ticket.innerHTML = `
                        <div class="head-color ${color}"></div>
                        <div class="ticket-sub-container">
                            <h2 class="task-id">#${id}</h2>
                            <p class="task-desc" contenteditable="false">${task}</p>
                        </div>
                        <div class="lock-container">
                            <i class="fas fa-lock"></i>
                        </div>
                        `;

    collectiveTicketContainer.appendChild(ticket);

    if (!ticketID) {  //undefined falsy value - If new id then add to local storage
        ticketsArr.push({ task, color, id });
        let strTicketsArr = JSON.stringify(ticketsArr);
        localStorage.setItem("availableTickets", strTicketsArr);
    }

    handleTicketColor(ticket, id);
    handleTicketLock(ticket, id);
    handleTicketRemoval(ticket, id);
    
}

function handleTicketLock(ticket, id) {  //Manage ticket locks for ticket task editing
    let ticketLock = ticket.querySelector(".fas");
    ticketLock.addEventListener("click", function() {
        let ticketIdx;
        ticketsArr.forEach((ele, idx) => {
            if (ele.id === id) {
                ticketIdx = idx;
            }
        }, id);

        let ticketTaskEditor = ticket.querySelector(".task-desc");
        let lockState = ticketLock.classList[1];
        ticketLock.classList.remove(lockState);

        if (lockState === "fa-lock") {
            ticketLock.classList.add(unlockClass);
            ticketTaskEditor.setAttribute("contenteditable", true);
        }
        else {
            ticketLock.classList.add(lockClass);
            ticketTaskEditor.setAttribute("contenteditable", false);

            let taskDesc = ticket.querySelector(".task-desc");   //Updating task content
            let updatedTask = taskDesc.innerText;
            ticketsArr[ticketIdx].task = updatedTask;
            let strArr = JSON.stringify(ticketsArr);
            localStorage.setItem("availableTickets", strArr);
        }

    });
}

function handleTicketColor(ticket, id) {  //Manage priority colors of ticket
    
    let colorHeader = ticket.querySelector(".head-color");
    colorHeader.addEventListener("click", () => {
        let ticketIdx;
        ticketsArr.forEach((ele, idx) => {
            if (ele.id === id) {
                ticketIdx = idx;
            }
        }, id);

        let prevColor = colorHeader.classList[1];
        let curColor = colors[(colors.indexOf(prevColor) + 1) % colors.length];
        colorHeader.classList.remove(prevColor);
        colorHeader.classList.add(curColor);
        ticketsArr[ticketIdx].color = curColor;
        let strArr = JSON.stringify(ticketsArr);
        localStorage.setItem("availableTickets", strArr);
    });
}

function handleTicketRemoval(ticket, id) {  //Manage removal of tickets
    ticket.addEventListener("click", () => {
        let ticketIdx;
        ticketsArr.forEach((ele, idx) => {
            if (ele.id === id) {
                ticketIdx = idx;
            }
        }, id);
    
        if (removeFlag == true) {  //Delete ticket
            ticketsArr.splice(ticketIdx, 1);
    
            let strTicketsArr = JSON.stringify(ticketsArr);
            localStorage.setItem("availableTickets", strTicketsArr);
            collectiveTicketContainer.removeChild(ticket);
        }
    });
}

function setToDefault() {  //Set state of modal container to default
    modalContainer.style.display = "none";
    taskArea.value = "";
    cColor = colors[colors.length - 1];
    priorityColor.forEach(function (colorElem) {
        colorElem.classList.remove("border");
    });
    priorityColor[priorityColor.length - 1].classList.add("border");
}