
    // For Server failure and sucess message
var serverMSG = document.getElementById("serverMessageSection")
if (serverMSG) {
    document.getElementById("closeServerMessageBox").addEventListener("click", () => {
        serverMSG.style.display = "none";
    });
    setTimeout(() => {
        serverMSG.style.display = "none";
    }, 5000);

}