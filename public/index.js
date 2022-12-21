const API = 'http://localhost:4000/api/v1/questions';

function getText(file) {
    fetch(file)
        .then((response) => response.json())
        .then((data) => {
            let dataParser = JSON.parse(data);
            let randomIndex = Math.floor((Math.random() * dataParser.length));
            let randomQuestion = dataParser[randomIndex]
            let questionContent = document.getElementById("questionContent");
            questionContent.innerHTML = randomQuestion.content;
            let dislike = document.getElementById("dislike");
            let like = document.getElementById("like");
            dislike.addEventListener("click", (e) => {
                e.preventDefault();
                let check = ++randomQuestion.dislike;
                console.log(check);
                let dataJSON = {
                    content: `${randomQuestion.content}`,
                    like: randomQuestion.like,
                    dislike: check,
                    id: randomQuestion.id
                }
                fetch(file, {
                    method: 'PUT', // or 'POST'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataJSON),
                })
                    .then((responsePUT) => responsePUT.json())
                    .then((dataPUT) => {
                        console.log('Success:', dataPUT);
                        window.location.href = `http://localhost:4000/question-detail/${randomQuestion.id}`
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
            like.addEventListener("click", () => {
                let check = ++randomQuestion.like;
                console.log(check);
                let dataJSON = {
                    content: `${randomQuestion.content}`,
                    like: check,
                    dislike: randomQuestion.dislike,
                    id: randomQuestion.id
                }
                console.log(dataJSON);
                fetch(file, {
                    method: 'PUT', // or 'POST'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataJSON),
                })
                    .then((responsePUT) => responsePUT.json())
                    .then((dataPUT) => {
                        console.log('Success:', dataPUT);
                        window.location.href = `http://localhost:4000/question-detail/${randomQuestion.id}`
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
        })
        .catch(error => {
            console.log(error);
        });
}
getText(API)







//   fetch('/api/v1/questions')
//   .then(response => response.json())
//   .then(questions => {
//     // Do something with the array of questions here
//   })
//   .catch(error => {
//     // Handle any errors here
//   });