 // For  show the addRecord popup box
 document.getElementById("addRecord").addEventListener("click", showForm);
 function showForm(event){
     var confirmationBox  = document.getElementById("confirmationBox");
     confirmationBox.style.display = "flex";
     var transparentBackground = document.getElementById("transparentBackground");
     transparentBackground.style.display = "block"
 }

 // For Hide the addRecord popup box
 document.getElementById("cancleButton").addEventListener("click", hideForm)
 function hideForm(){
   var confirmationBox  = document.getElementById("confirmationBox");
     confirmationBox.style.display = "none";
     var transparentBackground = document.getElementById("transparentBackground");
     transparentBackground.style.display = "none"
 }

 //for validate the addPhoto of addRecord popup
 document.getElementById("docSubmitionForm").addEventListener("submit", validateAddPhoto);
 function validateAddPhoto(event){
     let inputImgContent = document.getElementById("inputImgContent");
       if(inputImgContent.files.length === 0){
           alert("Please select the record image");
           event.preventDefault();
       }
 }

 // Script for delete button 
 let allDeletBtn = document.getElementsByClassName("deleteReport");

 for(let i=0; i<allDeletBtn.length; i++){
     allDeletBtn[i].addEventListener("click", deleteReport);
 }
 
 
 function deleteReport(event){
     let deleteReportPopUp = document.getElementById("deleteReportPopUp");
     var transparentBackground = document.getElementById("transparentBackground");
     transparentBackground.style.display = "block"
     deleteReportPopUp.style.display = "flex";
     let deleteReportForm = document.getElementById("deleteReportForm");
     deleteReportForm.action = "/deleteReport?reportId="+event.target.value;
 }

 document.getElementById("reportDeleteNoBtn").addEventListener("click", removePopup);

 function removePopup(){
    
     let deleteReportPopUp = document.getElementById("deleteReportPopUp");
     deleteReportPopUp.style.display = "none";
     var transparentBackground = document.getElementById("transparentBackground");
     transparentBackground.style.display = "none"
     
 }