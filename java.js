function task() {
  var answer = prompt("Введите дату в формате ДД.ММ.ГГГГ\n(впрочем и в другом формате, но с соблюдением порядка и количества)", "31.12.2018");
  var day = +answer.slice(answer.search(/\d*/), answer.search(/\D/));
  var month = +answer.slice(answer.search(/\D\d*\D/) + 1, answer.search(/\D\d*$/));
  var year = +answer.slice(answer.search(/\D\d*\D*$/) + 1);
  alert(answer + " by own function   :" + getDayName(day, month, year) + "\n" + answer + " by native function:" + getDayNameByNative(day, month, year));

  // проверка в консоль перебором
  for (var y = 1; y <= 2500; y++)
    for (var m = 1; m <= 12; m++)
      for (var d = 1; d <= 31; d++)
        if (getDayName(d, m, y) != getDayNameByNative(d, m, y)) {
          console.log("FAULT at " + d + "." + m + "." + y + " " + getDayName(d, m, y) + " - " + getDayNameByNative(d, m, y));
        } //else console.log(d+"."+m+"."+y +" - DONE");
  console.log("Finish");
}

function getDayName(day, month, year) {
  const daysName = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const courtDays = [0, 3 + isLeapYear(year), 28 + isLeapYear(year), 7, 4, 9, 6, 11, 8, 5, 10, 7, 12];
  if (year < 100) day++; // костыль детектед
  var dayDiff = (day - courtDays[month]) % 7;
  return daysName[(dayDiff + getCourtDay(year) + 7) % 7];
}

function isLeapYear(year) {
  if (year % 4 == 0)
    if (year % 100 == 0)
      if (year % 400 == 0)
        return true;
      else
        return false;
  else
    return true;
  return false;
}

function getCourtDay(year) {
  const ankerValue = [2, 0, 5, 3]; // ["Вторник","Воскресенье","Пятница","Среда"];    
  var step1 = ankerValue[Math.floor((year % 400) / 100)];
  var step2_1 = Math.floor((year % 100) / 12);
  var step2_2 = (year % 100) - (step2_1 * 12);
  var step2_3 = Math.floor(step2_2 / 4);
  return (step1 + step2_1 + step2_2 + step2_3) % 7;
}




// ------- OUT OF TASK FOR CHECK
function getDayNameByNative(day, month, year) {
  const daysName = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  var userDate = new Date(year, month - 1, day);
  return daysName[userDate.getDay()];
}