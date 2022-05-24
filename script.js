(function () {

  run()
    .catch(e => console.warn(e));

  // --------------------------------------------------

  async function run() {
    const val = await getIsWaterDone();
    if (val == null) {
      setIsWaterDone(false)
    }


    setInterval(checkDateAndShowBanner, 1000 * 60 * 60 * 24);
    await checkDateAndShowBanner();
  }

  async function checkDateAndShowBanner() {
    const date = new Date();
    const isWaterDone = await getIsWaterDone();
    if (!isWaterDone && checkDate(date)) {
      showBanner(new Date().getDate());
    }

    const dayNum = date.getDate();
    if (dayNum === 26) {
      setIsWaterDone(false);
    }


  }

  /**
   * Check if today's date in THE DATE!
   * @returns {boolean}
   */
  function checkDate(date) {
    date = date || new Date();
    const dayNum = date.getDate();
    const weekDay = date.getDay();

    if (dayNum === 22 && (weekDay === 4 || weekDay === 5)) {
      return true
    } else if (dayNum === 23 && (weekDay === 4 || weekDay === 5)) {
      return true
    } else if (dayNum === 24 && weekDay !== 6 && weekDay !== 0) {
      return true
    } else if (dayNum === 25 && weekDay !== 6 && weekDay !== 0) {
      return true
    } else {
      return false
    }
  }

  function showBanner(dayNum) {
    const banner = document.createElement("div");
    banner.classList.add(`banner_fgjh768hh`);
    banner.innerHTML = `
    <div class="text_fgjh768hh">Хоп, хей, лалалей! <br> 
      Сегодня ${dayNum} число. <br>
      Время комуналки пришло.
    </div>

    <div class="btn-wrap_fgjh768hh">
      <button class="btn_fgjh768hh" id="done_fgjh768hh">Сделано</button>
      <button class="btn_fgjh768hh" id="after_fgjh768hh">Потом сделаю</button>
    </div>
`;
    document.body.append(banner);

    const btnDone = querySelector(`#done_fgjh768hh`);
    const btnLate = querySelector(`#after_fgjh768hh`);

    btnDone.addEventListener("click", () => {
      onDoneClick(banner);
    });
    btnLate.addEventListener("click", () => {
      onAfterClick(banner);
    });
  }

  function onDoneClick(banner) {
    chrome.storage.local.set({isWaterDone: true});
    document.body.removeChild(banner);
  }

  function onAfterClick(banner) {
    document.body.removeChild(banner);
  }

  /**
   * Get isWaterDone variable from Chrome storage
   * @returns {Promise<boolean|undefined|null>}
   */
  function getIsWaterDone() {
    return new Promise(resolve => {
      chrome.storage.local.get(["isWaterDone"], result => {
        resolve(result.isWaterDone);
      });
    })
  }

  /**
   * Set isWaterDone variable to Chrome storage
   * @param {boolean|undefined} val
   */
  function setIsWaterDone(val) {
    chrome.storage.local.set({isWaterDone: val});
  }

  function querySelector(el) {
    return document.querySelector(el);
  }
})();
