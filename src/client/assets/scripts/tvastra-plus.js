var dot = document.getElementsByClassName("dot");
for (var i = 0; i < dot.length; i++) {
    dot[i].addEventListener("click", testElimentScroll)
}


setInterval(testElimentScroll, 5000);

function testElimentScroll() {
    var test_figure = document.getElementsByClassName("test_figure");
    for (var i = 0; i < test_figure.length; i++) {
        test_figure[i].classList.toggle("block_item");
    }
    for (var i = 0; i < dot.length; i++) {
        dot[i].classList.toggle("selected")
    }
}