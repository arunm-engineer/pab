document.addEventListener("paste", function (e) {
    try {
        let item = e.clipboardData.items[0];

        if (item.type.indexOf("image") === 0) {
            let blob = item.getAsFile();
            let reader = new FileReader();
            reader.onload = function (e) {
                let pasteImg = document.createElement("div");
                pasteImg.setAttribute("class", "paste-img");
                let img = document.createElement("img");
                img.src = e.target.result;
                img.style.width = "100%";
                img.style.height = "100%";
                pasteImg.appendChild(img);
                setClipboardImageProp(pasteImg);
                document.body.appendChild(pasteImg);
            }

            reader.readAsDataURL(blob);
        }
    }
    catch (e) {
        console.log(e);
    }
})

function setClipboardImageProp(pasteImg) {
    try {
        pasteImg.draggable = true;

        pasteImg.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("pic", e.target.class);
        })
        pasteImg.addEventListener("dragover", function (e) {
            e.preventDefault();
        })
        pasteImg.addEventListener("dragend", function (e) {
            e.preventDefault();
            e.currentTarget.style.left = e.x + "px";
            e.currentTarget.style.top = e.y - (3 * 16) + "px";
        })
    }
    catch (e) {
        console.log(e);
    }
}