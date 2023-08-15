const reload = document.getElementById("button-reset");

reload.addEventListener("click", () => {
  window.location.reload();
});
timezone.addEventListener("change", handleTimezoneChange);

function handleTimezoneChange() {
  const selectedTimezone = timezone.value;
  fetchCountryList(selectedTimezone);
  console.log(selectedTimezone);
}

async function fetchTimezoneList() {
  fetch("http://worldtimeapi.org/api/timezone")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      const Time = data;
      const timezone = document.getElementById("timezone");

      let optionsHTML = "";

      for (let x = 0; x < Time.length; x++) {
        optionsHTML += `<option value="${Time[x]}">${Time[x]}</option>`;
      }

      timezone.innerHTML = optionsHTML;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function fetchCountryList(timezone) {
  fetch(`http://worldtimeapi.org/api/timezone/${timezone}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      const datetime = data.datetime;
      setTime(datetime);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function setTime(datetime) {
  const time = datetime.substring(11, 19);
  const timeArray = time.split(":");
  setFirstTime(timeArray[0], timeArray[1]);

  setInterval(() => {
    if (timeArray[2] < 60) {
      timeArray[2]++;
    } else {
      timeArray[2] = 0;
      if (timeArray[1] < 59) {
        timeArray[1]++;
        LinesMoveMinutes(timeArray[1]);
      } else {
        timeArray[1] = 0;
        if (timeArray[0] < 23) {
          timeArray[0]++;
          LinesMoveHour(timeArray[0]);
        } else {
          timeArray[0] = 0;
        }
      }
    }
  }, 1000);
}

function setFirstTime(hour, minutes) {
  const line_minutes = document.getElementById("line-minutes");

  line_minutes.style.transform = `translateY(-45%) rotate(${minutes * 6}deg)`;
  line_minutes.style.transition = " 0.9s ease-in-out";

  const line_hour = document.getElementById("line-hours");

  line_hour.style.transform = `translateY(-45%) rotate(${hour * 15}deg)`;
  line_hour.style.transition = " 0.9s ease-in-out";
}

function LinesMoveMinutes(minutes) {
  const line_minutes = document.getElementById("line-minutes");

  line_minutes.style.transform = `translateY(-45%) rotate(${minutes * 6}deg)`;
  line_minutes.style.transition = " 0.3s ease-in-out";
}
function LinesMoveHour(hour) {
  const line_hour = document.getElementById("line-hours");

  line_hour.style.transform = `translateY(-45%) rotate(${hour * 15}deg)`;
  line_hour.style.transition = " 0.3s ease-in-out";
}

fetchTimezoneList();
