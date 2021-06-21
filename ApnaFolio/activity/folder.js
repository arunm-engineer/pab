let allProjects = document.querySelectorAll(".project");
let allBgHovers = document.querySelectorAll(".bg-hover");
let techStackIcon = document.querySelector(".tech-stack-icon");
let allTechStackCont = document.querySelectorAll(".tech-stack-cont");
let treeGitIcon = document.querySelector(".tree-git-icon");
let excelGitIcon = document.querySelector(".excel-git-icon");
let todoGitIcon = document.querySelector(".todo-git-icon");
let automationGitIcon = document.querySelector(".automation-git-icon");
let mailContactIcon = document.querySelector(".mail-contact-icon");
let githubContactIcon = document.querySelector(".github-contact-icon");
let linkedinContactIcon = document.querySelector(".linkedin-contact-icon");
let resumeContactIcon = document.querySelector(".resume-contact-icon");

for (let i = 0;i < allProjects.length;i++) {
    allProjects[i].addEventListener("mouseenter", e => {
        if (!allBgHovers[i].classList.contains("bg-animation-in")) allBgHovers[i].classList.add("bg-animation-in");
        if (allBgHovers[i].classList.contains("bg-animation-out")) allBgHovers[i].classList.remove("bg-animation-out");
    })
    allProjects[i].addEventListener("mouseleave", e => {
        if (allBgHovers[i].classList.contains("bg-animation-in")) allBgHovers[i].classList.remove("bg-animation-in");
        if (!allBgHovers[i].classList.contains("bg-animation-out")) allBgHovers[i].classList.add("bg-animation-out");
    })
}
for (let i = 0;i < allTechStackCont.length;i++) {
    let icons = allTechStackCont[i].querySelectorAll(".icon");
    allTechStackCont[i].addEventListener("mouseenter", e => {
        icons.forEach(icon => {
            if (icon.classList.contains("icon-pop-in")) icon.classList.remove("icon-pop-in");
            if (!icon.classList.contains("icon-pop-out")) icon.classList.add("icon-pop-out");  
        })
        if (allTechStackCont[i].classList.contains("icon-list-pop-in")) allTechStackCont[i].classList.remove("icon-list-pop-in");
        if (!allTechStackCont[i].classList.contains("icon-list-pop-out")) allTechStackCont[i].classList.add("icon-list-pop-out");
    })
    allTechStackCont[i].addEventListener("mouseleave", e => {
        icons.forEach(icon => {
            if (!icon.classList.contains("icon-pop-in")) icon.classList.add("icon-pop-in");
            if (icon.classList.contains("icon-pop-out")) icon.classList.remove("icon-pop-out");
        })
        if (!allTechStackCont[i].classList.contains("icon-list-pop-in")) allTechStackCont[i].classList.add("icon-list-pop-in");
        if (allTechStackCont[i].classList.contains("icon-list-pop-out")) allTechStackCont[i].classList.remove("icon-list-pop-out");
    })
}

treeGitIcon.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "https://arun496.github.io/TreeHouse/";
    a.target = "_blank";
    a.click();
    a.remove();
})
excelGitIcon.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "https://arun496.github.io/excelbook/";
    a.target = "_blank";
    a.click();
    a.remove();
})
todoGitIcon.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "https://arun496.github.io/todostack/";
    a.target = "_blank";
    a.click();
    a.remove();
})
automationGitIcon.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "https://github.com/arun496/pab_pep/tree/main/1_JS/5_JobReady";
    a.target = "_blank";
    a.click();
    a.remove();
})

mailContactIcon.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=arun496.in@gmail.com";
    a.target = "_blank";
    a.click();
    a.remove();
})
linkedinContactIcon.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "https://www.linkedin.com/in/arun-m496/";
    a.target = "_blank";
    a.click();
    a.remove();
})
githubContactIcon.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "https://github.com/arun496";
    a.target = "_blank";
    a.click();
    a.remove();
})
resumeContactIcon.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "./views/Arun_M.pdf";
    a.download = "Arun_M";
    a.click();
    a.remove();
})