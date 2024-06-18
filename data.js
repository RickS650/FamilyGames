import { showPopup } from './popup.js';

document.addEventListener('DOMContentLoaded', function () {
  let roundName = [];
  let catName = [];
  let questName = [];
  let ansName = [];
  let maxQuest = 0;
  let maxRounds = 9;
  // let questNo = 1;
  let questFlag = false;
  let specialCase = 0;   // used for question writers day off
  let myArray = [];
  let paused = false;    // used to pause during there once was a quiz show host called Richard
  let findAlpha = [];
  let oldCat = '';
  let cat = '';
  let questLeft = '';
  let questRight = '';
  let catFlag = false;

  // initialise constants
  const headerDisplay = document.getElementById('header');
  const hollyLeft = document.getElementById('hollyLeft');
  const hollyRight = document.getElementById('hollyRight');
  const masterDisplay = document.getElementById('masterRound');
  const roundDisplay = document.getElementById('round');
  const questDisplay = document.getElementById('question');
  const ansDisplay = document.getElementById('answer');
  const multiSpare = document.getElementById('spare');
  const doubleTrouble = document.getElementById('doubleTrouble');
  const letterBox = document.getElementById('letterBox');
  const leftBox = document.getElementById('leftBox');
  const rightBox = document.getElementById('rightBox');
  const smashDisplay = document.getElementById('smashIt');
  const catDisplay = document.getElementById('category');
  const allDone = document.getElementById('itsAllOver');
  const theScore = document.getElementById('namesScore');
  const ztoabanner = document.getElementById('ztoabanner');

  const player1 = document.getElementById('square1');
  const player2 = document.getElementById('square2');
  const player3 = document.getElementById('square3');
  const player4 = document.getElementById('square4');
  const player5 = document.getElementById('square5');

  const rhombus1 = document.getElementById('rhombus1');
  const rhombus2 = document.getElementById('rhombus2');
  const rhombus3 = document.getElementById('rhombus3');
  const rhombus4 = document.getElementById('rhombus4');
  const rhombus5 = document.getElementById('rhombus5');

  const playerName1 = document.getElementById('playerName1');
  const playerName2 = document.getElementById('playerName2');
  const playerName3 = document.getElementById('playerName3');
  const playerName4 = document.getElementById('playerName4');
  const playerName5 = document.getElementById('playerName5');
  const noOfPlayers = 5 // 1 less than the number of players, because questInRound start at 0;

  const players1 = document.getElementById('player1');
  const players2 = document.getElementById('player2');
  const players3 = document.getElementById('player3');
  const players4 = document.getElementById('player4');
  const players5 = document.getElementById('player5');

  const split0 = document.getElementById('split0');
  const split1 = document.getElementById('split1');
  const split2 = document.getElementById('split2');

  const cellList = document.getElementById('cellList');

  const redcross = document.getElementById('image');
  // const stopWatchDisplay = document.getElementById('stopwatch');
  const timeboxDisplay = document.getElementById('timebox');
  const playDisplay = document.getElementById('players');

  const playerElements = [players1, players2, players3, players4, players5];

  const songPlayer = document.createElement('audio');

  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      display(box.id.charAt(3));  // charAt is 0 based, so extract the id  from the box.id
    });
  });

  // function handleKeyPress1(event) {
  document.addEventListener('keydown', function (event) {

    switch (event.key) {
      case 'R':
      case 'r':       // round
        rounds();
        break;
      case 'C':
      case 'c':       // category
        cats();
        break;
      case 'Q':
      case 'q':       // question
        quests();
        break;
      case 'A':
      case 'a':       // answer
        ans();
        break;
      case 'S':
      case 's':       // scores
        getScores();
        break;
      case 'W':
      case 'w':       // wrong answer
        wrong();
        break;
      case 'Z':
      case 'z':       // start z to a
        ztoa();
        break;
      case 'T':
      case 't':       // show popup for times
        smashDisplay.style.display = 'none';
        showPopup();
        break;
    }
  });

  /* const rounds = [
    globalThis.round1,
    globalThis.round2,
    globalThis.round3,
    globalThis.round4,
    globalThis.round5,
    globalThis.round6
  ]; */

  // if (noRound >= 1 && noRound <= rounds.length) {
  // const roundData = rounds[noRound - 1]; // Adjust index to match array numbering
  /*   roundName = roundData[0];
    catName = roundData[1];
    questName = roundData[2];
    ansName = roundData[3];
    maxQuest = roundData[4];
  }
   */
  //********************************

  function rounds() {
    headerDisplay.style.display = 'none';
    hollyLeft.style.display = 'none';
    hollyRight.style.display = 'none';
    catDisplay.innerHTML = '';
    catDisplay.style.display = 'none';

    switch (noRound) {
      case 1:
        roundName = globalThis.round1[0];
        catName = globalThis.round1[1];
        questName = globalThis.round1[2];
        ansName = globalThis.round1[3];
        maxQuest = globalThis.round1[4];
        break;
      case 2:
        roundName = globalThis.round2[0];
        catName = globalThis.round2[1];
        questName = globalThis.round2[2];
        ansName = globalThis.round2[3];
        maxQuest = globalThis.round2[4];
        break;
      case 3:
        roundName = globalThis.round3[0];
        catName = globalThis.round3[1];
        questName = globalThis.round3[2];
        ansName = globalThis.round3[3];
        maxQuest = globalThis.round3[4];
        break;
      case 4:
        roundName = globalThis.round4[0];
        catName = globalThis.round4[1];
        questName = globalThis.round4[2];
        ansName = globalThis.round4[3];
        maxQuest = globalThis.round4[4];
        break;
      case 5:
        roundName = globalThis.round5[0];
        catName = globalThis.round5[1];
        questName = globalThis.round5[2];
        ansName = globalThis.round5[3];
        maxQuest = globalThis.round5[4];
        break;
      case 6:
        roundName = globalThis.round6[0];
        catName = globalThis.round6[1];
        questName = globalThis.round6[2];
        ansName = globalThis.round6[3];
        maxQuest = globalThis.round6[4];
        break;
      case 7:
        roundName = globalThis.round7[0];
        catName = globalThis.round7[1];
        questName = globalThis.round7[2];
        ansName = globalThis.round7[3];
        maxQuest = globalThis.round7[4];
        break;
      case 8:
        roundName = globalThis.round8[0];
        catName = globalThis.round8[1];
        questName = globalThis.round8[2];
        ansName = globalThis.round8[3];
        maxQuest = globalThis.round8[4];
        break;
      case 9:
        roundName = globalThis.round9[0];
        catName = globalThis.round9[1];
        questName = globalThis.round9[2];
        ansName = globalThis.round9[3];
        maxQuest = globalThis.round9[4];
        break;
      case 10:
        // play 'It's all over'
        allDone.innerHTML = `<img src=images/ThatsAll.png/>`;

        songPlayer.setAttribute('src', '/audio/ThatsAll.wav');
        songPlayer.play();
        allDone.style.display = 'block';
        return;
    }

    masterDisplay.style.display = 'block';
    roundDisplay.style.display = 'block';
    roundDisplay.innerHTML = roundName;

    questNo = 1;
    questFlag = true;

  }

  function cats() {
    if (questNo > maxQuest) { // Have we reached end of questions?
      letterBox.style.display = 'none';
      questDisplay.style.display = 'none';
      ansDisplay.style.display = 'none';
      smashDisplay.style.display = 'none';
      multiRound.style.display = 'none';
      masterDisplay.style.display = 'none';
      multiSpare.style.display = 'none';
      catDisplay.innerHTML = '';
      catDisplay.style.display = 'none';
      rightBox.style.display = 'none';
      leftBox.style.display = 'none';
      noRound++;
      return;
    }

    masterDisplay.style.display = 'block';
    roundDisplay.style.display = 'none';
    songPlayer.pause();

    if (catName[questNo] !== null) {
      catDisplay.innerHTML = catName[questNo];
      oldCat = catName[questNo];

      switch (roundName) {
        case "Question Writers' Day Off":
          // conditional (ternary) operator, like iif in visual basic
          maxQuest = (noOfPlayers == 8) ? 8 : noOfPlayers;

          multiRound.style.display = 'block';
          multiSpare.style.display = 'none';
          for (let i = 1; i < 9; i++) {
            document.getElementById('box' + i).style.display = 'block';
            document.getElementById('box' + i).innerHTML = catName[i];
          }
          break;
        case "Double Trouble":
          letterBox.innerHTML = catName[questNo];
          letterBox.style.display = 'block';
          break;
        case "The Elephant in the Room":
          catDisplay.style.display = 'none';
          if (catName[questNo] !== null) {
            catDisplay.innerHTML = catName[questNo];
            oldCat = catName[questNo];
          } else {
            catDisplay.innerHTML = oldCat;
          }

          // console.log(catDisplay.style.cssText);
          catDisplay.style.top = '1%';
          catDisplay.style.display = 'block';
          break;
        case "Sorry, Wrong Number":
          if (catName[questNo] !== null) {
            catDisplay.innerHTML = catName[questNo];
            oldCat = catName[questNo];
          } else {
            catDisplay.innerHTML = oldCat;
          }
          // catDisplay.style.position = 'fixed';
          catDisplay.style.top = '2%';
          catDisplay.style.width = '25%';
          catDisplay.style.display = 'block';
          break;
        case "Answer Smash":
          catDisplay.innerHTML = catName[questNo];
          catDisplay.style.display = 'block';
          break;
        default:
          roundDisplay.innerHTML = catName[questNo];
          catDisplay.style.display = 'block';
      }
    } else {
      if (oldCat != '') {
        catDisplay.innerHTML = oldCat;
      } else {
        catDisplay.style.display = 'none';
      }
    }
    roundDisplay.style.display = 'none';
    questDisplay.style.display = 'none';
    ansDisplay.style.display = 'none';
    doubleTrouble.style.display = 'none';
    smashDisplay.style.display = 'none';

    if ((maxQuest == questNo) && (noRound == noOfRounds)) {
      const imagePath = 'images/ThatsAll.png';
      allDone.style.backgroundImage = `url(${imagePath})`;
      allDone.style.backgroundSize = 'cover';
      allDone.style.backgroundRepeat = 'no-repeat';
      allDone.style.backgroundPosition = 'center';
      allDone.style.display = 'block';
    }
  }

  function quests() {
    if (questNo > maxQuest) {
      letterBox.style.display = 'none';
      questDisplay.style.display = 'none';
      ansDisplay.style.display = 'none';
      smashDisplay.style.display = 'none';
      catDisplay.style.display = 'none';
      if (questNo = "Z to A") {
        noRound++;
        document.querySelectorAll('[id^="cell"]').forEach(element => {
          element.style.display = 'none';
        });
      }
      return;
    } else {
      catDisplay.style.display = 'block';
    }
    if (questFlag != true) return;
    ansDisplay.style.display = 'none';

    switch (roundName) {
      case 'There Once was a Quiz Show Host Called Richard':
        roundDisplay.style.display = 'none';
        catDisplay.style.display = 'none';
        ansDisplay.style.display = 'none';
        ansDisplay.innerHTML = "";

        questDisplay.style.display = 'block';
        questDisplay.style.position = 'absolute';
        questDisplay.style.textAlign = 'justify';
        questDisplay.style.marginLeft = '32%';
        questDisplay.style.width = 'auto';


        let phrase = questName[questNo];
        myArray = phrase.split(",");
        let index = 0;

        questDisplay.innerHTML = '';

        displayNextLine(); // to display the first line
        document.addEventListener('keydown', function (event) {

          if (event.key === 'p' && !paused) {
            paused = true;
          } else if (event.key === 'p' && paused) {
            paused = false;
            displayNextLine();
          }
        });

        function displayNextLine() {
          if (!paused) {
            if (index < myArray.length) {
              if (index == myArray.length - 1) {
                questDisplay.innerHTML += myArray[index];
              } else {
                questDisplay.innerHTML += myArray[index] + ',<br>';
              }
              index++;
              setTimeout(displayNextLine, 2500);
            }
          } else {
            // If paused, do nothing and wait for the 'p' key to resume
          }
        }
        break;
      case "Question Writers' Day Off":
        roundDisplay.style.display = 'none';
        catDisplay.style.display = 'none';
        ansDisplay.style.display = 'none';
        ansDisplay.innerHTML = "";
        // masterDisplay.style.display = 'block';
        questDisplay.style.display = 'block';
        questDisplay.style.position = 'absolute';
        questDisplay.style.left = '13%';
        questDisplay.style.top = '120px';

        if (questName[specialCase].includes('a.')) {    // has text got bullet points
          let formatText = formatQuestionText(questName[specialCase]);
          formatText = formatText.replace(/\n/g, '<br>');
          questDisplay.style.lineHeight = '0.70';
          questDisplay.style.textAlign = 'left';
          questDisplay.innerHTML = formatText;
        } else {
          questDisplay.style.textAlign = 'center';
          questDisplay.innerHTML = questName[specialCase];
        }
        break;
      case 'Double Trouble':
        let pic = false;
        catDisplay.style.display = 'none'
        doubleTrouble.style.display = 'block';

        rightBox.innerHTML = '';
        rightBox.style.backgroundImage = ``;
        leftBox.innerHTML = '';

        // Reset the height to 'auto' or ''
        leftBox.style.height = '';
        rightBox.style.height = '';

        let qLeft = questName[questNo].split('-')[0];
        let qRight = questName[questNo].split('-')[1];

        leftBox.innerHTML = qLeft;
        leftBox.style.display = 'block';
        leftBox.style.height = '';

        if (qRight.includes('.jpg')) {
          pic = true;
        }

        if (qRight.includes('.jpg')) {
          pic = true;
          let imagePath = 'images/' + qRight;
          rightBox.style.backgroundImage = `url(${imagePath})`;
          rightBox.style.backgroundSize = 'cover';
          rightBox.style.backgroundRepeat = 'no-repeat';
          rightBox.style.backgroundPosition = 'center';
        } else {
          rightBox.innerHTML = qRight;
          rightBox.style.display = 'block';
          rightBox.style.height = '';
        }

        let height = Math.max(leftBox.offsetHeight, rightBox.offsetHeight);
        height = height + 'px';

        rightBox.style.height = height;
        rightBox.style.marginTop = '1%';
        leftBox.style.height = height;
        leftBox.style.marginTop = '1%';

        leftBox.style.display = 'block';
        rightBox.style.display = 'block';

        break;
      case "Z to A":
        ztoabanner.style.display = 'none'
        document.querySelectorAll('[id^="cell"]').forEach(element => {
          element.style.display = 'none';
        });

        counter = 0;
        oldAlpha = [];

        roundDisplay.style.display = 'none';
        catDisplay.style.display = 'none';
        questDisplay.style.display = 'none';

        let question = questName[questNo];

        question = question.toUpperCase();

        let dashCount = countFrequency(question, "-") + 1;

        let splitWords0 = question.split('-')[0];
        let splitWords1 = question.split('-')[1];
        let splitWords2 = question.split('-')[2];

        let strt = 0;

        for (let x = 0; x < dashCount; x++) {
          switch (x) {
            case 0:
              processLetters(splitWords0, strt, splitWords0.length + strt);
              strt = strt + splitWords0.length;
              break;
            case 1:
              processLetters(splitWords1, splitWords0.length, splitWords1.length + strt);
              strt = strt + splitWords1.length;
              break;
            case 2:
              processLetters(splitWords2, splitWords1.length, splitWords2.length + strt);
              strt = strt + splitWords1.length;
              break;
          }

        }

        split0.style.display = 'block';
        split1.style.display = 'block';
        split2.style.display = 'block';

        cellList.style.display = 'block';
        for (let y = 0; y <= 25; y++) {
          changeColorOneAtATime(y, 'red');
        }

        ztoabanner.style.display = 'block';
        break;
      case 'The Elephant in the Room':
        catDisplay.style.display = 'none';

        rightBox.innerHTML = '';
        rightBox.style.backgroundImage = ``;
        leftBox.innerHTML = '';

        // Reset the height to 'auto' or ''
        leftBox.style.height = '';
        rightBox.style.height = '';

        roundDisplay.style.display = 'none';
        ansDisplay.style.display = 'none';
        ansDisplay.innerHTML = "";
        questRight = '';
        questLeft = '';

        if (catName[questNo] !== null) {
          catDisplay.innerHTML = catName[questNo];
          oldCat = catName[questNo];
          cat = catName[questNo];
        } else {
          catDisplay.innerHTML = oldCat;
        }

        if (questName[questNo].indexOf('-') !== -1) {
          questLeft = questName[questNo].split('-')[0];
          questRight = questName[questNo].split('-')[1];
          doubleTrouble.style.display = 'block';
        } else {
          questDisplay.innerHTML = questName[questNo];
          questDisplay.style.display = 'block';
          questDisplay.style.top = '160px';
        }

        catDisplay.style.display = 'block';
        catDisplay.innerHTML = "Don't say the word '" + cat + "'";

        // If there is an audio clip then display question in
        // left hand box and music image in right.
        // So first find if .wav exists
        if (questRight.indexOf('.wav') != -1) {
          questDisplay.style.display = 'none';

          // rightBox.style.height = 'auto';
          rightBox.style.marginTop = '110px';
          rightBox.innerHTML = '';
          rightBox.style.backgroundImage = ``;

          // leftBox.style.height = 'auto';
          leftBox.style.display = 'block';
          leftBox.style.marginTop = '110px';
          // leftBox.innerHTML = '';
          leftBox.innerHTML = questLeft;

          // take the second part and split it into song and time to play
          let wav = questName[questNo].split('-')[1];
          let timeIt = wav.split(wav)[1] * 1000 // * 1000 to get secs to play
          wav = wav.split(wav)[0] + '.wav';

          let imagePath = 'images/note.jpg';

          rightBox.style.display = 'block';
          rightBox.style.backgroundImage = `url(${imagePath})`;
          rightBox.style.backgroundSize = 'cover';
          rightBox.style.backgroundRepeat = 'no-repeat';
          rightBox.style.backgroundPosition = 'center';

          songPlayer.setAttribute('src', 'audio/' + questName[questNo] + '.wav');
          playIt(timeIt);

          let height = Math.max(leftBox.offsetHeight, rightBox.offsetHeight) + 15;
          height = height + 'px';
          rightBox.style.height = height;
          leftBox.style.height = height;

        } else {  // straightforward question
          rightBox.style.display = 'none';
          leftBox.style.display = 'block';
          questDisplay.style.display = 'block';
        }
        //  document.querySelector('.overlay').style.opacity = '0.5'; 
        // document.getElementById('image').style.opacity = '1';
        // redcross.style.display = 'block';
        // redcross.style.top = '5px';
        // redcross.style.height = '70px';
        break;
      case "Win When You're Singing":
        longTime = catName[questNo].split('-')[1];
        let shortTime = catName[questNo].split('-')[0];

        roundDisplay.style.display = 'none';
        catDisplay.style.display = 'none';
        smashDisplay.innerHTML = '';
        smashDisplay.style.display = 'none';
        smashDisplay.style.backgroundImage = ``;
        smashDisplay.dataset.imagePath = 'images/note.jpg';
        const imagePath = smashDisplay.dataset.imagePath;
        smashDisplay.style.backgroundImage = `url(${imagePath})`;

        smashDisplay.style.backgroundSize = 'cover';
        smashDisplay.style.backgroundRepeat = 'no-repeat';
        smashDisplay.style.backgroundPosition = 'center';
        smashDisplay.style.height = '200px';
        smashDisplay.style.width = '200px';
        // smashDisplay.style.top = '45%';
        smashDisplay.style.marginTop = '15%';
        smashDisplay.style.display = 'block';

        // Play the audio and handle the promise
        songPlayer.setAttribute('src', 'audio/' + questName[questNo] + '.wav');
        songPlayer.play().then(() => {
          (async () => {
            await sleep(shortTime * 1000);
            songPlayer.pause();
            songPlayer.currentTime = 0;
            await sleep((shortTime * 1000) / 2);
            smashDisplay.style.display = 'none';
            showPopup();
          })();
        }).catch(error => {
          console.error("Error playing audio:", error);
        });

        break;
      case 'Sorry, Wrong Number':
        // catDisplay.innerHTML = catName[questNo];
        // catDisplay.style.position = 'fixed';
        /*         catDisplay.style.top = '2%';
                catDisplay.style.width = '25%'
                catDisplay.style.display = 'block'; */

        roundDisplay.style.display = 'none';

        ansDisplay.style.display = 'none';
        ansDisplay.innerHTML = "";

        questDisplay.style.display = 'block';
        questDisplay.style.marginTop = '7%';
        questDisplay.innerHTML = questName[questNo];
        break;
      case "Answer Smash":
        smashDisplay.style.backgroundImage = ``;
        roundDisplay.style.display = 'none';
        questLeft = questName[questNo].split('-')[0];
        questRight = questName[questNo].split('-')[1];

        if (!questRight.includes('.jpg')) {
          smashDisplay.innerHTML = questRight;
          height = Math.max(questLeft.offsetHeight, questRight.offsetHeight) + 15;
          height = height + 'px';
          questRight.style.height = height;
          questLeft.style.height = height;
        } else {
          questDisplay.style.top = '1%';
          questDisplay.style.display = 'block';
          questDisplay.innerHTML = questLeft;
          smashDisplay.dataset.imagePath = 'images/' + questRight;
          const imagePath = smashDisplay.dataset.imagePath;
          smashDisplay.style.backgroundImage = `url(${imagePath})`;
          smashDisplay.style.backgroundSize = 'cover';
          smashDisplay.style.backgroundRepeat = 'no-repeat';
          smashDisplay.style.backgroundPosition = 'center';
          smashDisplay.style.height = '200px';
          smashDisplay.style.width = '200px';
          smashDisplay.style.top = '5%';
        }
        setTimeout(() => {
          smashDisplay.style.display = 'block';
        }, 3500);
        break;
      default:     // all other rounds 
        roundDisplay.style.display = 'none';
        ansDisplay.style.display = 'none';
        ansDisplay.innerHTML = "";
        questDisplay.style.display = 'block';
        questDisplay.innerHTML = questName[questNo];
    }

  }

  async function ans() {
    ansDisplay.style.backgroundColor = 'yellow';
    switch (roundName) {
      case "Question Writers' Day Off":

        ansDisplay.style.position = 'absolute';
        ansDisplay.style.left = '31%';
        ansDisplay.style.width - 'auto'
        ansDisplay.style.top = '440px';
        ansDisplay.style.height = 'auto';

        songPlayer.setAttribute('src', 'audio/ansRight.wav');
        playIt(2000);

        ansDisplay.style.display = 'block';
        ansDisplay.innerHTML = ansName[specialCase];
        questDisplay.style.display = 'block';

        questNo++;
        break;

      case "Double Trouble":
        ansDisplay.style.display = 'block';
        ansDisplay.style.position = 'absolute';
        ansDisplay.style.left = '29%';
        ansDisplay.style.top = '400px';
        ansDisplay.innerHTML = ansName[questNo];

        songPlayer.setAttribute('src', 'audio/ansRight.wav');
        playIt(2000);

        // ansDisplay.style.display = 'block';
        questNo++;
        break;

      case "The Elephant in the Room":
        ansDisplay.style.position = 'absolute';
        ansDisplay.style.top = '390px';
        ansDisplay.style.left = '29%';
        ansDisplay.innerHTML = ansName[questNo];
        ansDisplay.style.display = 'block';
        // console.log(ansDisplay.style.cssText);

        songPlayer.setAttribute('src', 'audio/ansRight.wav');
        playIt(2000);

        questNo++;
        break;
      case "Win When You're Singing":

        smashDisplay.style.display = 'none';
        roundDisplay.style.display = 'none';
        timeboxDisplay.style.display = 'block';
        playDisplay.style.display = 'block';
        
        const playerNames = globalThis.names;
        for (let i = 0; i < playerElements.length; i++) {
          const playerElement = playerElements[i];
          playerElement.style.color = 'red';
          playerElement.style.backgroundColor='yellow';
          playerElement.style.borderColor='white';
          playerElement.style.display = 'block';
          playerElement.innerHTML = playerNames[i] + ' - ' + capturedTimes[i];
        }
        songPlayer.setAttribute('src', 'audio/' + questName[questNo] + '.wav');
        songPlayer.play();
        startStopwatch();
        updateStopwatch();

        ansDisplay.innerHTML = ansName[questNo];
        timeboxDisplay.style.display = 'block';
        playDisplay.style.display = 'block';
        ansDisplay.style.marginTop = '8%';
        ansDisplay.style.display = 'none';

        playIt((longTime * 1000) + 4000); // 4 secs added
        await delay(((longTime * 1000) + 2000)); // now wait before display answer

        timeboxDisplay.style.display = 'none';
        playDisplay.style.display = 'none';
        ansDisplay.style.display = 'block';

        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = 'audio/ansRight.wav';
        audio.play();

        for (let i = 1; i <= names; i++) {
          const inputElement = document.getElementById(`player${i}TimeInput`);
          if (inputElement) {
            inputElement.value = '';
          }
        }
        resetStopwatch();
        questNo++;

        break;
      case "Z to A":
        ansDisplay.style.top = '57%';
        ansDisplay.style.width = '400px';
        ansDisplay.style.position = 'absolute';
        ansDisplay.style.display = 'block';
        ansDisplay.style.left = '35%';
        ansDisplay.style.height = 'auto';
        ztoabanner.style.display = 'none';
        ansDisplay.innerHTML = ansName[questNo];
        questNo++;
        // cellList.style.display = 'none';
        break;
      case "Answer Smash":
        ansDisplay.style.top = '57%';
        ansDisplay.style.width = '400px';
        ansDisplay.style.position = 'absolute';

        songPlayer.setAttribute('src', 'audio/ansRight.wav');
        playIt(2000);

        ansDisplay.style.display = 'block';
        ansDisplay.style.left = '35%';
        ansDisplay.style.height = '150px';
        ansDisplay.innerHTML = ansName[questNo];
        questNo++;
        break;
      default:
        // questDisplay.style.top = '15%';
        // ansDisplay.style.marginTop = '28%';
        ansDisplay.style.width = '16%';
        ansDisplay.style.display = 'block';
        ansDisplay.innerHTML = ansName[questNo];

        songPlayer.setAttribute('src', 'audio/ansRight.wav');
        playIt(2000);

        questDisplay.style.display = 'block';
        questNo++;
    }

  }

  function wrong() {

    ansDisplay.style.backgroundColor = 'lightgray';
    ansDisplay.innerHTML = '';

    switch (roundName) {
      case "Question Writers' Day Off":
        // if (ansDisplay) {
        ansDisplay.style.position = 'absolute';
        ansDisplay.style.left = '15%';
        ansDisplay.style.top = '300px';
        ansDisplay.style.height = '100px';
        sleep(1000);
        break;

      case "Double Trouble":
        ansDisplay.style.position = 'absolute';
        ansDisplay.style.left = '15%';
        ansDisplay.style.height = '100px';
        ansDisplay.style.top = '300px';

        ansDisplay.style.top = '50%';
        break;

      case "Answer Smash":
        ansDisplay.styletop = '57%';
        ansDisplay.style.width = '400px';
        ansDisplay.style.position = 'absolute';
        ansDisplay.style.left = '35%';
        break;

    }
    // Play the audio
    songPlayer.setAttribute('src', 'audio/ansWrong.wav');
    playIt(1500);

    ansDisplay.style.display = 'block';
  }

  // function for 'question writers day off'
  function display(pick) {
    specialCase = Number(pick);
    let pickedDisplay;
    // Hide all boxes except the picked one
    for (let i = 1; i <= 8; i++) {
      if (i !== parseInt(specialCase)) {
        document.getElementById('box' + i).style.display = 'none';
      }
    }

    pickedDisplay = document.getElementById('box' + pick);
    pickedDisplay.style.backgroundColor = 'lightgray';

    multiSpare.innerHTML = pickedDisplay.innerHTML;
    pickedDisplay.style.display = 'none';
    multiSpare.style.display = 'block';

  }

  function getScores() {

    // noRound++
    theScore.style.display = 'block';
    let playerName = '';
    let playerScore = 0;

    for (let x = 0; x < 5; x++) {
      playerName = globalThis.names[x];
      playerScore = globalThis.scores[x];
      const image = document.createElement('img');
      image.style.top = '23px';
      image.style.left = '23px';
      image.style.position = 'center';
      image.style.width = '70%';
      image.style.height = '70%';
      image.style.transform = 'rotate(-45deg)';
      switch (x) {
        case 0:
          playerName1.innerHTML = playerName;
          player1.innerHTML = playerScore
          player1.style.display = 'block';
          playerName1.style.display = 'block';
          image.src = 'images/' + playerName + 'Cartoon.png';
          rhombus1.appendChild(image);
          break;
        case 1:
          playerName2.innerHTML = playerName;
          player2.innerHTML = playerScore;
          player2.style.display = 'block';
          playerName2.style.display = 'block';
          image.src = 'images/' + playerName + 'Cartoon.png';
          rhombus2.appendChild(image);
          break;
        case 2:
          playerName3.innerHTML = playerName;
          player3.innerHTML = playerScore;
          player3.style.display = 'block';
          playerName3.style.display = 'block';
          image.src = 'images/' + playerName + 'Cartoon.png';
          rhombus3.appendChild(image);
          break;
        case 3:
          playerName4.innerHTML = playerName;
          player4.innerHTML = playerScore;
          player4.style.display = 'block';
          playerName4.style.display = 'block';
          image.src = 'images/' + playerName + 'Cartoon.png';
          rhombus4.appendChild(image);
          break;
        case 4:
          playerName5.innerHTML = playerName;
          player5.innerHTML = playerScore;
          player5.style.display = 'block';
          playerName5.style.display = 'block';
          image.src = 'images/' + playerName + 'Cartoon.png';
          rhombus5.appendChild(image);
          break;
      }
    }
  }
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);

  }

  function countFrequency(inputString, targetChar) {

    const regexPattern = new RegExp(targetChar, "g");
    const frequencyMatches = inputString.match(regexPattern);
    const counter = frequencyMatches ? frequencyMatches.length : 0;
    return counter;
  }

  // function for z - a
  let cid = 0;
  let splits = ['split0', 'split1', 'split2'];
  let counter = 0;
  let oldAlpha = [];

  function processLetters(array2Process, startNo, endNo) {
    const splits = ['split0', 'split1', 'split2'];

    for (let y = 0; y < array2Process.length; y++) {
      let chr = array2Process[y];

      if (chr == '\u0020') chr = '-'; // '\u0020' is space (chr(32))

      let newCell = document.createElement('div');

      newCell.innerHTML = chr;
      newCell.className = 'alphaBox';
      newCell.id = 'cell' + cid;

      if (chr == '-') { // make sure a space is displayed as a space
        newCell.style.backgroundColor = 'red';
        newCell.style.border = 'red';
        newCell.style.color = 'red';
      }

      let splitElement = document.getElementById(splits[counter]).appendChild(newCell);
      let cell = document.getElementById(newCell.id);

      // Check if the character already exists in oldAlpha
      let existingEntry = oldAlpha.find(entry => entry[0] === chr);
      if (existingEntry) {
        // If it exists, add the new cell id to the entry
        existingEntry.push(newCell.id);
      } else {
        // If it doesn't exist, create a new entry
        oldAlpha.push([chr, newCell.id]);
      }

      cid++;
      cell.style.verticalAlign = 'center';
      cell.style.display = 'inline-block';

      cellList.style.color = 'yellow';
      cellList.style.verticalAlign = 'center';
      splitElement.style.display = 'flex';
      splitElement.style.display = 'inline-block';
    }
    counter++;
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let pauseFlag = false;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
      pauseFlag = !pauseFlag;
    }
  });

  // can't get audio to sync properly - to be fixed later
  async function ztoa() {
    const audio = new Audio('/audio/plop.wav');
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(90 - i)); // Z to A
    const existsInArray = (char) => oldAlpha.some(([firstColumn]) => firstColumn === char);

    let y = 0;
    let doneIt = '';

    alphabet.forEach((char) => {
      if (!existsInArray(char)) {
        oldAlpha.push([char]);
      }
    });

    oldAlpha.sort((a, b) => a[0].localeCompare(b[0]));

    for (let x = oldAlpha.length - 1; x >= 0; x--) {
      while (pauseFlag) {
        await delay(100); // Wait 100ms and check the pause flag again
      }

      let [firstValue, ...ids] = oldAlpha[x];

      if (doneIt.indexOf(firstValue) === -1) {
        doneIt += firstValue;
      }

      if (firstValue !== '-') {
        if (ids.length === 0) { // process letters not in category
          changeColorOneAtATime(y, 'yellow');
        } else { // process letters used in category
          ids.forEach(id => {
            let cellChange = document.getElementById(id);
            if (cellChange) {
              cellChange.style.color = 'red';
            }
          });
          // Add a slight delay before changing the color to yellow, 
          // to give time for multiple chars of the same to process
          await delay(100);
          changeColorOneAtATime(y, 'yellow');
        }

        if (y === oldAlpha.length - 1) {
          await delay(3000); // Wait 3 seconds before hiding the banner
          ztoabanner.style.display = 'none';
        }

        await delay(1350); // Wait 1.35 seconds before processing the next letter
        y++;
      }
    }
  }

  // Function to change the color of letters one at a time
  function changeColorOneAtATime(index, cxColor) {
    if (index < 0 || index >= 26) return;

    let banner = document.querySelector('.ztoabanner');
    let nodes = banner.querySelectorAll('span');
    let node = nodes[index];
    node.style.color = cxColor;
  }

  let isRunning = false;

  function startStopwatch() {
    stopwatchInterval = setInterval(updateStopwatch, 10);
    isRunning = true;
  }

  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    isRunning = false;
  }

  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    seconds = 0;
    updateStopwatch();
    isRunning = false;
  }

  function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  let stopwatchInterval;
  let seconds = 0;
  let tenths = 0;
  let hundredths = 0;

  function updateStopwatch() {    // used only by Win When Singing
    hundredths++;
    if (hundredths === 10) {
      hundredths = 0;
      tenths++;
    }
    if (tenths === 10) {
      tenths = 0;
      seconds++;
    }
    let formattedTime = `${seconds.toString().padStart(2, '0')}.${tenths.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
    timeboxDisplay.innerHTML = formattedTime;

    if (seconds + (tenths / 10) + (hundredths / 100) >= longTime) {

      for (let i = 0; i < playerElements.length; i++) {
        let playerElement = playerElements[i];

        if (bestElement.indexOf(i) >= 0) {
          playerElement.style.backgroundColor = 'lightgrey';
          playerElement.style.borderColor = 'lightgreen';
        }
      }

      stopStopwatch();
    }

  }

  function pad(str) {     //used in update time above
    return str.length < 2 ? '0' + str : str;
  }

  // Function to toggle collapse state
  function toggleCollapse() {
    smashDisplay.classList.toggle('collapsed');
  }

  // Play music function
  function playIt(howLong) {
    // Start playing the sound after a delay
    setTimeout(() => {
      songPlayer.play();
      setTimeout(() => {
        songPlayer.pause();
        songPlayer.currentTime = 0; // Reset to the beginning
      }, howLong);
    }, 1000);

  }

  // Function to format the text
  function formatQuestionText(text) {
    return text.replace(/a\./g, '\na.')   // Replace 'A.' with newline followed by 'A.'
      .replace(/b\./g, '\nb.')   // Replace 'B.' with newline followed by 'B.'
      .replace(/c\./g, '\nc.')   // Replace 'C.' with newline followed by 'C.'
      .replace(/d\./g, '\nd.');  // Replace 'D.' with newline followed by 'D.'
  }

  function resetZ2A() {

    // remove old letters, if they exist
    for (let x = oldAlpha.length - 1; x >= 0; x--) {
      let firstValue = oldAlpha[x][1];
      if (firstValue) {
        let cellChange = document.getElementById(firstValue);
        if (cellChange) {
          let parentElement = cellChange.parentElement;
          if (parentElement) {
            parentElement.removeChild(cellChange);
          }
        }
      }
    }
    return;
  }

});