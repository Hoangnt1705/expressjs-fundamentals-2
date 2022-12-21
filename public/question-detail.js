let url = window.location.href.substring(38)
const API = `http://localhost:4000/api/v1/questions/${url}`;
fetch(API)
    .then((response) => response.json())
    .then((data) => {
        let dataParse = JSON.parse(data);
        const dislike = document.getElementById("dislike");
        const like = document.getElementById("like");
        const totalVotes = parseInt(dataParse.like) + parseInt(dataParse.dislike);
        const questionContent = document.getElementById("questionContent");
        const voteNumber = document.getElementById("voteNumber");
        voteNumber.innerHTML = `${totalVotes} vote`
        questionContent.innerHTML = dataParse.content;
        let likeStatistical = (dataParse.like / totalVotes) * 100;
        let dislikeStatistical = (dataParse.dislike / totalVotes) * 100;
        like.innerText = Math.floor(likeStatistical).toFixed(1) + `%`;
        dislike.innerText = Math.floor(dislikeStatistical).toFixed(1) + `%`;
        let btn = document.getElementById("btn");
        btn.addEventListener("click", () => {
            window.location.href = "http://localhost:4000/";
        })
    });