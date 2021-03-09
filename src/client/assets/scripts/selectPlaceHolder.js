let select = document.getElementsByClassName("select");

for(var i=0; i<select.length; i++){
    select[i].addEventListener("change", (event) => {
        event.target.style.color = '#151e3b';
    })
}

