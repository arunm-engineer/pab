function customInterval() {
    let id = null;

    function setIntervalPolyfill(fn, delay) {
        function customInternalInterval() {
            let ID = setTimeout(() => {
                // console.log('within recursion', id);
                fn();
                if (id)
                    customInternalInterval();
            }, delay);
            if (!id) id = ID;
        }
        customInternalInterval();
        // console.log('top level out', id);

        return id;
    }

    function clearIntervalPolyfill(timeoutid) {
        clearTimeout(timeoutid);
        id = null;
    }

    return {
        setIntervalPolyfill,
        clearIntervalPolyfill
    }
}

let { setIntervalPolyfill, clearIntervalPolyfill } = customInterval();


let count = 0;
let timeoutid = setIntervalPolyfill(() => {
    // console.log("count", count, timeoutid);
    console.log("Hello", count);
    count++;
    if (count == 3) clearIntervalPolyfill(timeoutid);
}, 1000)
// console.log(timeoutid);
// setInterval(() => {
//     console.log("hi", count);
//     count++;
// }, 1000);