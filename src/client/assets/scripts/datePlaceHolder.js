var date = document.getElementById("date");
date.addEventListener("click", datePlaceHolder);
function datePlaceHolder(event) {
    console.log(event.currentTarget)
    event.currentTarget.style.color = "#151e3b";
}