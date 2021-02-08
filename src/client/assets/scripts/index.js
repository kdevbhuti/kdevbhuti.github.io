var work = document.getElementsByClassName("work_label");
for (var i = 0; i < 7; i++) {
  work[i].addEventListener("click", enableWorkView);
}


function disableAllWorkLable() {
  var name = "";
  elemant = {};
  for (var i = 0; i < 7; i++) {
    //disable all h3 heading
    if (!(work[i].classList.contains("disable_h3"))) {
      work[i].classList.add("disable_h3")
    }
    name = work[i].getAttribute('name')
    //disable all articals
    elemant = document.getElementById(name);
    if (elemant.classList.contains("enable_article")) {
      elemant.classList.add("disable_article");
      elemant.classList.remove("enable_article")
    }
  }
}

function enableWorkView(event) {
  if (event.currentTarget.classList.contains("disable_h3")) {
    disableAllWorkLable();

    event.currentTarget.classList.remove("disable_h3");

    var name = event.currentTarget.getAttribute('name');
    var artical = document.getElementById(name);
    if (artical.classList.contains("disable_article")) {
      artical.classList.add("enable_article")
      artical.classList.remove("disable_article")
    }
  }
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////


var index = 0;

function carusal() {
  var doc_details = document.getElementsByClassName("doc_details");
  var doctor_dot = document.getElementsByClassName("dot");
  setInterval(() => {
    if (window.screen.availWidth >= 1024) {
      var temp = document.getElementsByClassName("doc_details")[0].cloneNode(true);
      //For doctor details slide
      for (var i = 0; i < doc_details.length - 1; i++) {
        doc_details[i].innerHTML = doc_details[i + 1].innerHTML;
      }
      doc_details[i].innerHTML = temp.innerHTML;

      //FOr dots slide
      index++
      if (index == doctor_dot.length) {
        index = 0
      }
      if (index - 1 < 0) {
        doctor_dot[doctor_dot.length - 1].classList.remove("selected");
      } else {
        doctor_dot[index - 1].classList.remove("selected")
      }

      doctor_dot[index].classList.add("selected");

    }
  }, 3000);
}

carusal();


// Action to click on carusal dots
var dot = document.getElementsByClassName("dot");
for(var i=0; i<dot.length; i++){
  dot[i].addEventListener("click", changePic);
}


var doc_details = document.getElementsByClassName("doc_details");
var duplicate = [];
for (var i = 0; i < doc_details.length; i++) {
  duplicate[i] = document.getElementsByClassName("doc_details")[i].cloneNode(true);
}

function changePic(event) {
  index = event.target.getAttribute('name');
  for (var i = 0; i < doc_details.length; i++) {
    if (doc_details.length == index) {
      index = 0;
    }
    doc_details[i].innerHTML = duplicate[index].innerHTML;
    index++;
  }
  if (doc_details.length == index) {
    index = 0;
  }

  for(var i=0; i<dot.length; i++){
    dot[i].classList.remove("selected");
  }
  event.target.classList.add("selected");

}

  //////////////////////////////////////////////////////////////////////////////////////////

var feature_index = 0;

function carusalFeature() {
  var feature_img_block = document.getElementsByClassName("img_block");
  var dot = document.getElementsByClassName("feature_dot");
  var temp = {};
  setInterval(() => {
    if (window.screen.availWidth >= 1024) {
      temp = feature_img_block[0].cloneNode(true);
      temp2 = feature_img_block[1].cloneNode(true);
      for (var i = 0; i < feature_img_block.length - 2; i = i + 2) {
        feature_img_block[i].innerHTML = feature_img_block[i + 2].innerHTML;
        feature_img_block[i + 1].innerHTML = feature_img_block[i + 3].innerHTML;
      }
      feature_img_block[i + 1].innerHTML = temp2.innerHTML;
      feature_img_block[i].innerHTML = temp.innerHTML;

      //Feature dot///////////////////////
      feature_index++
      if (feature_index == dot.length) {
        feature_index = 0
      }
      if (feature_index - 1 < 0) {
        dot[dot.length - 1].classList.remove("selected");
      } else {
        dot[feature_index - 1].classList.remove("selected")
      }
      dot[feature_index].classList.add("selected");
    }
  }, 3000)
}


carusalFeature()


var  feature_dot = document.getElementsByClassName("feature_dot");
for(var i=0; i<feature_dot.length; i++){
  feature_dot[i].addEventListener("click", changeCarusal)
}


var feature_details = document.getElementsByClassName("img_block");
var feature_duplicate = [];
for (var i = 0; i < feature_details.length; i++) {
  feature_duplicate[i] = document.getElementsByClassName("img_block")[i].cloneNode(true);
}

function changeCarusal(event){
  feature_index = event.target.getAttribute('name');
  for (var i = 0; i < feature_details.length; i= i+2) {
    if (feature_dot.length == feature_index) {
      feature_index = 0;
    }
    feature_details[i].innerHTML = feature_duplicate[feature_index*2].innerHTML;
    feature_details[i+1].innerHTML = feature_duplicate[feature_index*2 + 1].innerHTML;
    feature_index ++;
  }
  if (feature_dot.length === feature_index) {
    feature_index = 0;
  }
  for(var i=0; i<feature_dot.length; i++){
    feature_dot[i].classList.remove("selected");
  }
  event.target.classList.add("selected");
}
