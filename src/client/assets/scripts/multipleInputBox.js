document.getElementById("submit").addEventListener("click", validate);

//Validate all input class
function validate() {
    var validate = document.getElementsByClassName("validator");
    for (var i = 0; i < validate.length; i++) {
        if (validate[i].children[0].tagName.toLocaleLowerCase() === "input") {
            validate[i].lastElementChild.required = true;
        } else {
            validate[i].lastElementChild.required = false;
        }
    }
}


const input = document.getElementsByClassName("tagInput")

for (var i = 0; i < input.length; i++) {
    input[i].addEventListener("change", function (event) {
        var spanName = event.target.parentNode.id;
        
        const tag = addTag(event.target.value, spanName)
        event.target.parentNode.insertBefore(tag, event.target)
        event.target.value = '';
    })
}


function addTag(label, spanName) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    // span.setAttribute("name", spanName);
    span.innerHTML = label;
    const input = document.createElement("input");
    input.setAttribute('type', 'hidden');
    input.setAttribute("name", spanName);
    input.value = label;
    const crossButton = document.createElement('i');
    crossButton.classList.add('fas', 'fa-times');

    

    div.appendChild(span);
    div.appendChild(input)
    div.appendChild(crossButton);

    crossButton.addEventListener("click",(event)=>{
        event.target.parentNode.remove();
    })
    return div;
}

