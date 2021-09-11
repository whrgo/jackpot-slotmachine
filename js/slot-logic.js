const symbols = [
    {
      title: 'threeBar',
      position: 100,
      weight: 2
    },
    {
      title: 'oneBar',
      position: 300,
      weight: 6
    },
    {
      title: 'twoBar',
      position: 500,
      weight: 5
    },
    {
      title: 'seven',
      position: 700,
      weight: 1
    },
    {
      title: 'cherry',
      position: 900,
      weight: 3
    }
  ]

const reels = [
    {
        imageSrc: './images/reel-strip125.png',
        symbols: symbols
    },
    {
        imageSrc: './images/reel-strip125.png',
        symbols: symbols
    },
    {
        imageSrc: './images/reel-strip125.png',
        symbols: symbols
    }
];

const winningOptions = {
    ThreeBar : {
        isWinner: (payLine) => {
            return _.isEqual(["threeBar", "threeBar", "threeBar"], payLine);
        },
        points: 10
    },
    ThreeSeven : {
        isWinner: (payLine) => {
            return _.isEqual(["seven", "seven", "seven"], payLine)
        },
        points: 50
    },
    ThreeCherries : {
        isWinner: (payLine) => {
            return _.isEqual(["cherry", "cherry", "cherry"], payLine)
        },
        points: 150
    },
    ThreeTwoBar : {
        isWinner: (payLine) => {
            return _.isEqual(["twoBar", "twoBar", "twoBar"], payLine)
        },
        points:  5
    },
    ThreeOneBar : {
        isWinner: (payLine) => {
            return _.isEqual(["oneBar", "oneBar", "oneBar"], payLine)
        },
        points:  2
    },
    CherryOrSeven: {
        isWinner: (payLine) => {
            let hasCherry = _.indexOf(payLine, "cherry") != -1; 
            let hasSeven = _.indexOf(payLine, "seven") != -1;
            return hasCherry && hasSeven;
        },
        points: 20
    }
};

const calculatePoints = (payLine) => {
    const selectedReelTitles = _.flatMap(payLine, (reelItem) => {return reelItem.title});
    let pointsAwareded = 0;
    _.mapValues(winningOptions, (option) => {
        let isWinner = option.isWinner(selectedReelTitles);
        if (isWinner){
            pointsAwareded = option.points;
            return;
        }
      });

    return pointsAwareded;
};

/*
const toggleBlinking = (turnOn = false) =>{
    if (turnOn){
        //document.getElementById("earn-img-box").style.visibility = "visible";
        //document.getElementByClassName(points+"box").classList.add("blink");
    } else {
        //document.getElementById("earn-img-box").style.visibility = "hidden"
        //document.getElementByClassName(points+"box").classList.remove("blink");
    }

};
*/
const updateCreditText = (value) => {
    document.getElementById("totalCredits").innerHTML = `$${value}`;
};
