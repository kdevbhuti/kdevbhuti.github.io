    // clock time validation////////////////////////////////////////
    document.getElementById("submit").addEventListener("click", timeValidation);

    function timeValidation() {
        let startTime = document.getElementById("startTime");
        let endTime = document.getElementById("endTime");
        console.log(startTime.value)
        if (startTime.value === "") {
            startTime.setCustomValidity("Please fill up the field.");
        } else {
            startTime.setCustomValidity("");
        }
        if (endTime.value === "") {
            endTime.setCustomValidity("Please fill up the field.");
        } else {
            endTime.setCustomValidity("");
        }
        let stime = startTime.value.split(" ");
        let startMeridiem = stime[1];
        let etime = endTime.value.split(" ");
        let endMeridiem = etime[1];

        let startHour = parseInt(stime[0].split(":")[0], 10);
        let startMin = parseInt(stime[0].split(":")[1], 10);

        let endHour = parseInt(etime[0].split(":")[0], 10);
        let endMin = parseInt(etime[0].split(":")[1], 10);

        if (startMeridiem === endMeridiem) {
            if ((startHour > endHour) || ((startHour === endHour) && (startMin > endMin)) || ((startHour === endHour) && (startMin === endMin))) {
                endTime.setCustomValidity("Ending time must be come after seduled start time " + startTime.value + ".");
            }
        } else if (startMeridiem === "pm") {
            startTime.setCustomValidity("Time must be Anti meridiem.")
        } else if (endMeridiem === "am") {
            endTime.setCustomValidity("Time must be Post meridiem.")
        } else {
            startTime.setCustomValidity("");
            endTime.setCustomValidity("");
        }
    }

    //Time interval validation///////////////////////////
    document.getElementById("submit").addEventListener("click", validateInterval);

    function validateInterval() {
        const interval = document.getElementById("interval");
        if (interval.value === "") {
            interval.setCustomValidity("Please fill up the field.");
        } else if (interval.value < 15) {
            interval.setCustomValidity("Value must be gretter then or equal to 15.");
        } else {
            interval.setCustomValidity("")
        }
    }

    //delete schedule////////////////////////////////////////////
    const removeSchedule = document.getElementsByClassName("removeSlot");
    for (let i = 0; i < removeSchedule.length; i++) {
        removeSchedule[i].addEventListener("click", (event) => {
            window.location.replace("remove-schedule?schedule_id=" + event.target.value);
        })
    }

    //view slots////////////////////////////////////
    const viewSlots = document.getElementsByClassName("viewSlot")
    for (let i = 0; i < viewSlots.length; i++) {
        viewSlots[i].addEventListener("click", (event) => {
            const timeElements = document.getElementById(event.target.value);

            if (timeElements.style.display === "flex") {
                timeElements.style.display = "none";
            } else {
                timeElements.style.display = "flex";
            }
        })
    }

    document.getElementById("newSchedule").addEventListener("click", showForm);
    function showForm() {
        let transparentBackground = document.getElementById("transparentBackground")
        let formContainer = document.getElementById("formContainer");
        transparentBackground.style.display = "block";
        formContainer.style.display = "block";
    }

    document.getElementById("cancleButton").addEventListener("click", hideForm);
    function hideForm() {
        let transparentBackground = document.getElementById("transparentBackground")
        let formContainer = document.getElementById("formContainer");
        transparentBackground.style.display = "none";
        formContainer.style.display = "none";
    }