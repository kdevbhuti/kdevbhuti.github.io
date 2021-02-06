var downBtn = document.getElementsByClassName("fa-chevron-down");
for (var i = 0; i < downBtn.length; i++) {
    downBtn[i].addEventListener("click", showAns);
}


var question = document.getElementsByClassName("question_contain");
for (var i = 0; i < question.length; i++) {
    question[i].addEventListener("click", showAns);
}


function showAns(event) {
    var name = event.currentTarget.getAttribute("name");
    var ans = document.getElementById(name);
    if(event.target.classList.contains("fa-chevron-down")){
        event.target.classList.toggle("fa-chevron-up")
    }else{
        var arrow = event.currentTarget.nextElementSibling;
        arrow.classList.toggle("fa-chevron-up")
    }
    if (ans.style.display === "block") {
        ans.style.display = "none"
    }
    else {
        ans.style.display = "block";
    }

}
