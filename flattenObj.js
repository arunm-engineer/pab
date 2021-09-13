let obj = {
    obj1: {
        obj3: {
            obj5: {
                one: 1,
                two: 2,
                three: 3
            }
        },
        obj4: {
            one: 1,
            two: 2
        }
    },
    obj2: {
        one: 1
    },
    one: 1
}

function flattenObj(obj) {
    let result = {};
    for (let key in obj) {
        if (typeof obj[key] == "object") {
            let returnObj = flattenObj(obj[key]);
            for (let innerkey in returnObj) {
                result[key + "." + innerkey] = returnObj[innerkey];
            }
        }
        else {
            result[key] = obj[key];
        }
    }

    return result;
}

let flattenedObj = flattenObj(obj);
console.log(flattenedObj);