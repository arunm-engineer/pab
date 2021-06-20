console.log(document.body);
let huntBtn = document.querySelector(".hunt-btn");
huntBtn.addEventListener("click", e => {
    let a = document.createElement("a");
    a.href = "./folder.html";
    a.click();
    a.remove();
})