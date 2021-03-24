document.getElementById("right-arrow").addEventListener("click", slideRight);
function slideRight() {
    var servise_content = document.getElementsByClassName("servise_content");
    var flag = false;
    for (var i = 0; i < servise_content.length; i++) {
        if (servise_content[i].classList.contains("disable")) {

            for (j = 0; j < 3; j++) {
                if (i === servise_content.length) {
                    console.log(servise_content.length)
                    i = 0;
                    flag = true;
                }
                servise_content[i].classList.remove("disable");
                i++;
            }
            console.log(servise_content)
            if (flag) {
                break
            } else {
                while (i < servise_content.length) {
                    servise_content[i].classList.add("disable")
                    i++;
                }
                break
            }
        } else {
            servise_content[i].classList.add("disable");
        }
    }
}


document.getElementById("left-arrow").addEventListener("click", leftSlide)
function leftSlide() {
    var servise_content = document.getElementsByClassName("servise_content");
    var flag = false;
    for (var i = servise_content.length - 1; i >= 0; i--) {
        if (servise_content[i].classList.contains("disable")) {

            for (j = 0; j < 3; j++) {
                if (i === servise_content.length) {
                    console.log(servise_content.length)
                    i = 0;
                    flag = true;
                }
                servise_content[i].classList.remove("disable");
                i--;
            }
            if (flag) {
                break
            } else {
                while (i >= 0) {
                    servise_content[i].classList.add("disable")
                    i--;
                }
                break
            }
        } else {
            servise_content[i].classList.add("disable");
        }
    }
}