(function () {
  checkDate();
  chrome.storage.local.get(["isWaterDone"], function (result) {
    if (result.key === undefined) {
      chrome.storage.local.set({ isWaterDone: false });
    }
  });
  setInterval(checkDate, 1000 * 60 * 60 * 24);

  // --------------------------------------------------

  function $(el) {
    return document.querySelector(el);
  }

  function showBanner(dayNum) {
    const banner = document.createElement("div");
    banner.classList.add("banner_768hh");
    banner.innerHTML = `
    <div class="text_768hh">Хоп, хей, лалалей! <br> 
      Сегодня ${dayNum} число. <br>
      Время комуналки пришло.
    </div>

    <div class="btn-wrap_768hh">
      <button class="btn_768hh" id="done_768hh">Сделано</button>
      <button class="btn_768hh" id="after_768hh">Потом сделаю</button>
    </div>
      `;
    document.body.append(banner);

    const btnDone = $("#done_768hh");
    const btnLate = $("#after_768hh");

    btnDone.addEventListener("click", () => {
      onDoneClick(banner);
    });
    btnLate.addEventListener("click", () => {
      onAfterClick(banner);
    });
  }

  function checkDate() {
    const date = new Date();
    const dayNum = date.getDate();
    const dayName = date.getDay();

    //showBanner(dayNum); // delete

    if (dayNum === 22 && dayName === 4) {
      checkIsWaterDone(dayNum);
    } else if (dayNum === 23) {
      if(dayName === 4 || dayName === 5) {
      checkIsWaterDone(dayNum);
      }
    } else if (dayNum === 24 && dayName !== 6 && dayName !== 7) {
      checkIsWaterDone(dayNum);
    } else if (dayNum === 25 && dayName !== 6 && dayName !== 7) {
      checkIsWaterDone(dayNum);
    } else {
      chrome.storage.local.get(["isWaterDone"], function (result) {
        if (result.key === true) {
          chrome.storage.local.set({ isWaterDone: false });
        }
      });
    }
  }

  function checkIsWaterDone(dayNum) {
    chrome.storage.local.get(["isWaterDone"], function (result) {
      if (result.key === false) {
        showBanner(dayNum);
      }
    });
  }

  function onDoneClick(banner) {
    chrome.storage.local.set({ isWaterDone: true });
    document.body.removeChild(banner);
  }

  function onAfterClick(banner) {
    document.body.removeChild(banner);
  }
})();
