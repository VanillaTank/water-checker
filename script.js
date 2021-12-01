(function () {

  run()
    .catch(e => console.warn(e));

  // --------------------------------------------------

  async function run() {
    const val = await getIsWaterDone()
    if (val == null) {
      setIsWaterDone(false)
    }
    setInterval(checkDateAndShowBanner, 1000 * 60 * 60 * 24);
    await checkDateAndShowBanner();
  }

  async function checkDateAndShowBanner() {
    const isWaterDone = await getIsWaterDone()
    if (!isWaterDone && checkDate()) {
      showBanner(new Date().getDate());
    } else if (isWaterDone) {
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

    if(dayNum === 22 && (weekDay === 4 || weekDay === 5)) {
      return true
    } else if (dayNum === 23 && (weekDay === 4 || weekDay === 5)) {
      return true
    } else if (dayNum === 24 && weekDay !== 6 && weekDay !== 0) {
      return true
    } else if (dayNum === 25 && weekDay !== 6 && weekDay !== 0) {
      return true
    }  else {
      return false
    }
  }

  function showBanner(dayNum) {
    const banner = document.createElement("div");
    const randomStr = Math.random().toString(36).substring(2, 5)
    banner.classList.add(`banner_${randomStr}`);
    banner.innerHTML = `
    <div class="text_${randomStr}">Хоп, хей, лалалей! <br> 
      Сегодня ${dayNum} число. <br>
      Время комуналки пришло.
    </div>

    <div class="btn-wrap_${randomStr}">
      <button class="btn_${randomStr}" id="done_${randomStr}">Сделано</button>
      <button class="btn_${randomStr}" id="after_${randomStr}">Потом сделаю</button>
    </div>
`;
    document.body.append(banner);

    const btnDone = querySelector(`#done_${randomStr}`);
    const btnLate = querySelector(`#after_${randomStr}`);

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
      chrome.storage.local.get(["isWaterDone"], result => resolve(result.key));
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
