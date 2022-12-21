const API = 'http://localhost:4000/api/v1/questions';

let askQuestion = document.getElementById("askQuestion");
askQuestion.addEventListener("input", () => {
    let v_keyup_length_max = (max, elementid) => {
        let thisValue = document.getElementById(elementid).value
        if (thisValue.length > max) {
            document.getElementById(elementid).value = thisValue.substr(0, max)
        }
    };
    v_keyup_length_max(200, 'askQuestion');
    let v_show_remaining = (max, elementid, remainingid) => {
        let thisvalue = document.getElementById(elementid).value

        if (max > 0) {
            if (thisvalue.length > max) {
                document.getElementById(elementid).innerHTML = thisvalue.substr(0, max)
            }
        }
        document.getElementById(remainingid).innerHTML = max - thisvalue.length
        return true
    }
    v_show_remaining(200, 'askQuestion', 'letter');
});
let formSubmit = document.getElementById("formSubmit");
formSubmit.addEventListener("submit", () => {
    let checkEmpty = (elementid) => {
        let thisvalue = document.getElementById(elementid).value;
        if (thisvalue == '') {
            alert("Please input")
        }
        let dataJSON = {
            content: `${thisvalue}`,
            like: 0,
            dislike: 0,
            id: parseInt(Date.now())
        }
        fetch(API, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataJSON),
        })
            .then((responsePOST) => responsePOST.json())
            .then((dataPOST) => {
                console.log(dataPOST);
                window.location.href = 'http://localhost:4000/'

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    checkEmpty("askQuestion")
});