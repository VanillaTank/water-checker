yearTest()

function yearTest() {

  let day = new Date(new Date().getFullYear(), 0, 1);

  do {
    console.log(`${day.toLocaleDateString('ru-RU', {weekday: "long", month: "long", day: "numeric"})}`, checkDate(day))

    day.setDate(day.getDate() + 1);
  } while (!(day.getMonth() === 0 && day.getDate() === 1))

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