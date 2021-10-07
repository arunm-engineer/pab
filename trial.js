// XMLHttpRequest

// let xhr = new XMLHttpRequest();
// xhr.open("POST", "http://localhost:3000/");
// xhr.send(JSON.stringify("Hello from frontend"));
// xhr.addEventListener("load", () => {
//     console.log(xhr.status, xhr.response);
// })

// let xhr = new XMLHttpRequest();
// xhr.open("GET", "http://localhost:3000/");
// xhr.setRequestHeader('Content-type', 'text/plain');
// xhr.send("Hello");
// xhr.addEventListener("load", () => {
//     console.log(xhr.status, xhr.responseType, xhr.statusText, xhr.response);
// })

// Fetch
// fetch("http://localhost:3000/", {
//     method: "POST",
//     body: "Hello"
// })
//     .then((res) => {
//         console.log(res);
//         return res.text();
//     })
//     .then((data) => {
//         console.log(data);
//     })


// axios.post("http://localhost:3000/")
// .then((res) => {
//     console.log(res.data);
// })