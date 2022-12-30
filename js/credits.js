let defaultCreditAmount = 10000;
let totalCredits = 0;
let dealCredit = 1;
let playFlag = false;

function checkCredit(credits) {
  if (totalCredits < credits) {
    cusAlert("크레딧이 부족합니다!");

    //alert("your credits is not enough!");   //your credits is not enough alert!!!
    document.getElementById("blind").style.visibility = "visible";
    document.getElementById("blind").classList.add("blink");
    setTimeout(function () {
      document.getElementById("blind").classList.remove("blink");
      document.getElementById("blind").style.visibility = "hidden";
    }, 1400);

    return false;
  } else {
    updateCredits(-credits);
    return true;
  }
}

const updateCredits = (credits) => {
  totalCredits += credits;
  updateCreditText(totalCredits);
  setCookie("slotcredit", totalCredits, 365); //save
};

function setSize() {
  const defaultWidth = 600;
  //const scale =   window.innerWidth / defaultWidth;
  const scale =
    document.getElementById("slot_machine_main").clientWidth / defaultWidth;
  const x = -Math.floor((defaultWidth - defaultWidth * scale) / 2);
  const y = 0;
  //translate('+x+'px ,'+y+'px )
  if (scale < 1.0 && scale > 0.0) {
    document.getElementById("slot_machine_box").style.transform =
      "scale(" + scale + ")";
  } else {
    document.getElementById("slot_machine_box").style.transform = "scale(1.0)";
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//On load set up slotmachine object and pass in a callback function
//when slot results come out to update balance
window.onload = function () {
  //init setting
  var pastcredit = getCookie("slotcredit");
  if (pastcredit == null) {
    //memory credit
    //alert(pastcredit);
    updateCredits(defaultCreditAmount);
  } else {
    //alert(pastcredit);
    updateCredits(parseInt(pastcredit));
  }

  playFlag = false;
  setSize();
  //init setting

  window.addEventListener("resize", function () {
    setSize();
  });

  const callbackPostSpin = function (payLine) {
    const pointsWon = calculatePoints(payLine);

    setTimeout(function () {
      playFlag = false;

      if (pointsWon > 0) {
        cusAlert(
          "게임에서 승리해 " + pointsWon * dealCredit + "$ 를 얻었습니다!"
        );

        updateCredits(pointsWon * dealCredit);
      }
    }, 4000);
  };

  let machine = document.getElementById("slot-machine");
  const slot = slotMachine(machine, reels, callbackPostSpin);

  //Run slot machine in fixed mode
  const spinFixed = () => {
    const reel1Value = document.getElementById("reel1").value;
    const reel2Value = document.getElementById("reel2").value;
    const reel3Value = document.getElementById("reel3").value;
    slot.defaultSelections = [reel3Value, reel2Value, reel1Value];
    slot.play();
  };

  const setBalance = () => {
    var balance = document.getElementById("balance").value;
    if (balance > 0) {
      totalCredits = 0;
      updateCredits(parseInt(balance));
    }
  };

  //Set all button events
  document
    .getElementById("100play")
    .addEventListener("click", function (event) {
      dealCredit = 100;
      if (!playFlag && checkCredit(dealCredit)) {
        playFlag = true;
        slot.play();
      }
    });
  document
    .getElementById("1000play")
    .addEventListener("click", function (event) {
      dealCredit = 1000;
      if (!playFlag && checkCredit(dealCredit)) {
        playFlag = true;
        slot.play();
      }
    });
  document
    .getElementById("5000play")
    .addEventListener("click", function (event) {
      dealCredit = 5000;
      if (!playFlag && checkCredit(dealCredit)) {
        playFlag = true;
        slot.play();
      }
    });
  document
    .getElementById("10000play")
    .addEventListener("click", function (event) {
      dealCredit = 10000;
      if (!playFlag && checkCredit(dealCredit)) {
        playFlag = true;
        slot.play();
      }
    });
  document
    .getElementById("100000play")
    .addEventListener("click", function (event) {
      dealCredit = 100000;
      if (!playFlag && checkCredit(dealCredit)) {
        playFlag = true;
        slot.play();
      }
    });

  //reset
  document
    .getElementById("resetBtn")
    .addEventListener("click", function (event) {
      dealCredit = 1;

      if (!playFlag) {
        totalCredits = defaultCreditAmount;
        cusAlert(
          "크레딧이 " + defaultCreditAmount + "$" + " 로 초기화 되었습니다"
        );

        updateCreditText(totalCredits);

        setCookie("slotcredit", totalCredits, 365); //save

        blinkBox(false, "earn-img-box150");
        blinkBox(false, "earn-img-box50");
        blinkBox(false, "earn-img-box20");
        blinkBox(false, "earn-img-box10");
        blinkBox(false, "earn-img-box5");
        blinkBox(false, "earn-img-box2");

        playFlag = false;
      }
    });

  document
    .getElementById("playButtonFixed")
    .addEventListener("click", () => spinFixed());
};
