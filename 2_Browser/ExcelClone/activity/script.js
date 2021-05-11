let addSheetBtn = document.querySelector(".add-sheets-btn-container");
let sheetsListContainer = document.querySelector(".sheets-list-container");
let firstSheet = document.querySelector(".sheet");

// Excel always has one sheet by default. So that sheet to be active
firstSheet.addEventListener("click", handleSheetActiveness);

addSheetBtn.addEventListener("click", function() {
    let totalSheets = document.querySelectorAll(".sheet");
    let lastSheet = totalSheets[totalSheets.length-1];
    let lastID = Number(lastSheet.getAttribute("id"));

    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("id", `${lastID+1}`);
    newSheet.textContent = `Sheet${lastID+2}`;
    sheetsListContainer.appendChild(newSheet);
    
    // Maintaining sheets activeness on user click
    newSheet.addEventListener("click", handleSheetActiveness);
});

function handleSheetActiveness(e) {
    let currSheet = e.currentTarget;  // Gets element on which this eventlistener was called 
    let totalSheets = document.querySelectorAll(".sheet");
    for (let i = 0;i < totalSheets.length;i++) {
        totalSheets[i].classList.remove("active");
    }

    currSheet.classList.add("active");
}