document.getElementById("profile_menu").addEventListener("click", dropdownProfileMenu)
let dropdown = document.getElementById("dropdown_profile_items");

document.addEventListener("click", (event) => {
  if (!(document.getElementById("profile_menu").contains(event.target))) {
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    }
  }
})
function dropdownProfileMenu() {
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}