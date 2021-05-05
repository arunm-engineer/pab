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

if (localStorage.getItem("availableTickets")) {
    let strTicketsArr = localStorage.getItem("availableTickets");
    ticketsArr = JSON.parse(strTicketsArr);
    for (let i = 0; i < ticketsArr.length; i++) {
        let ticketObj = ticketsArr[i];
        crudTicketUtility(ticketObj);
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

taskArea.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        let task = taskArea.value;
        createTicket(task, cColor);
        setToDefault();
        addFlag = false;
        // console.log("task", task, "color", cColor);    
    }
});

for (let i = 0; i < priorityColor.length; i++) {
    priorityColor[i].addEventListener("click", function () {
        priorityColor.forEach(function (colorElem) {
            colorElem.classList.remove("border");
        });
        priorityColor[i].classList.add("border");
        cColor = priorityColor[i].classList[0];
    });
}

for (let i = 0; i < colorElemArr.length; i++) {  //Filtering tickets according to toolbar priority actions
    colorElemArr[i].addEventListener("click", function () {

        let childElemsArr = colorElemArr[i].children;
        let colorClassArr = childElemsArr[0].classList;
        let filterColor = colorClassArr[0];
        // mainContainerBox.style.backgroundColor = filterColor;

        let filteredTicketsArr = ticketsArr.filter(function (ticketObj, idx) {
            if (filterColor === "black") return true;
            return ticketObj.color === filterColor;
        });

        let crudTicketsArr = collectiveTicketContainer.children;
        for (let i = collectiveTicketContainer.children.length - 1; i >= 0; i--) {
            collectiveTicketContainer.removeChild(crudTicketsArr[i]);
        }
        filteredTicketsArr.forEach(function (ticketObj) {
            crudTicketUtility(ticketObj);
        });

    });
}

function crudTicketUtility(ticketObj) {
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket-container");
    ticket.innerHTML = `
                        <div class="head-color ${ticketObj.color}"></div>
                        <div class="ticket-sub-container">
                            <h2 class="task-id">#${ticketObj.id}</h2>
                            <p class="task-desc" contenteditable="false">${ticketObj.task}</p>
                        </div>
                        <div class="lock-container">
                            <i class="fas fa-lock"></i>
                        </div>
                        `;
    collectiveTicketContainer.appendChild(ticket);

    let ticketCrudSpace = ticket.querySelector(".ticket-sub-container");
    let ticketLock = ticket.querySelector(".fas");
    handleTicketCrud(collectiveTicketContainer, ticket, ticketCrudSpace, ticketObj.id);
    handleTicketLock(ticket, ticketLock);
}

function createTicket(task, color) {
    let id = shortid();
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
    ticketsArr.push({ task, color, id });
    let strTicketsArr = JSON.stringify(ticketsArr);
    localStorage.setItem("availableTickets", strTicketsArr);

    collectiveTicketContainer.appendChild(ticket);

    let ticketCrudSpace = ticket.querySelector(".ticket-sub-container");
    handleTicketCrud(collectiveTicketContainer, ticket, ticketCrudSpace, id);
    let ticketLock = ticket.querySelector(".fas");
    handleTicketLock(ticket, ticketLock);
}

function handleTicketLock(ticket, ticketLock) {
    ticketLock.addEventListener("click", function() {
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

        }
    });
}

function handleTicketCrud(collectiveTicketContainer, ticket, ticketCrudSpace, id) {

    ticketCrudSpace.addEventListener("click", function () {
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
        else {  //Manage priority colors of ticket
            let colorHeader = ticket.querySelector(".head-color");
            let prevColor = colorHeader.classList[1];
            let curColor = colors[(colors.indexOf(prevColor) + 1) % colors.length];
            colorHeader.classList.remove(prevColor);
            colorHeader.classList.add(curColor);
            ticketsArr[ticketIdx].color = curColor;
            let strArr = JSON.stringify(ticketsArr);
            localStorage.setItem("availableTickets", strArr);
        }

        ticketCrudSpace.addEventListener("keydown", function (e) {    //Updating task content
            if (e.ctrlKey && e.key == "Enter") {            //Use ctrl + enter to update edited task
                let taskDesc = ticket.querySelector(".task-desc");
                let updatedTask = taskDesc.innerText;
                ticketsArr[ticketIdx].task = updatedTask;
                let strArr = JSON.stringify(ticketsArr);
                localStorage.setItem("availableTickets", strArr);
            }
        });

    });
}

function setToDefault() {
    modalContainer.style.display = "none";
    taskArea.value = "";
    cColor = colors[colors.length - 1];
    priorityColor.forEach(function (colorElem) {
        colorElem.classList.remove("border");
    });
    priorityColor[priorityColor.length - 1].classList.add("border");
}