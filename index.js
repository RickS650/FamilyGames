import readXlsxFile from 'https://cdn.jsdelivr.net/npm/read-excel-file@5.7.1/+esm';

globalThis.fileName='';
document.addEventListener('DOMContentLoaded', function () {
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
    fileName='Data Files/HouseOfGames'+ currentYear + '.xlsx';
    loadExcelFile();
});

globalThis.noRound = 8;         // current round number
globalThis.questNo = 1;         // current question number
globalThis.catNo = 1;           // current category number
// globalThis.noQuestInRound = 0;  // current question number
globalThis.noOfRounds = 0;
globalThis.scores = [];
globalThis.names = [];
globalThis.longTime = 0;
globalThis.capturedTimes = [];
globalThis.bestElement = [];

globalThis.round1 = [];
globalThis.round2 = [];
globalThis.round3 = [];         // set up global variables to be read by other files
globalThis.round4 = [];
globalThis.round5 = [];
globalThis.round6 = [];
globalThis.round7 = [];
globalThis.round8 = [];
globalThis.round9 = [];

let catName = [];
let questName = [];
let ansName = [];
let roundName = [];

async function loadExcelFile() {
    try {
        const response = await fetch(fileName);
        const blob = await response.blob();

        readXlsxFile(blob).then((rows) => {
            // console.log(rows);
            // document.getElementById('game-container').textContent = 'Questions loaded!';

            const sheets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];     //add more if needed
            sheets.forEach((sheet) => {
                readXlsxFile(blob, { sheet }).then((data) => {
                    if (sheet <= 8) {
                        processSheetData(data, sheet);
                    } else if (sheet === 9) {
                        processSheetData(data, sheet);
                        noOfRounds = 9; // this must always match the Answer Smash round number
                    } else if (sheet === 10) {      // and this, always the scores
                        names = data[0];
                        scores = data[1];   // row 2
                    }
                });
            });

        }).catch(error => {
            console.error('Error reading the Excel file:', error);
            document.getElementById('game-container').textContent = 'Failed to load questions.';
        });
    } catch (error) {
        console.error('Error fetching the Excel file:', error);
        document.getElementById('game-container').textContent = 'Failed to load questions.';
    }
}

function processSheetData(data, sheet) {
    let max = data.length - 1;
    roundName = data[1][0];
    catName = [];
    questName = [];
    ansName = [];

    catName[0] = '';
    questName[0] = '';
    ansName[0] = '';

    for (let y = 1; y <= max; y++) {
        catName.push(data[y][1]);
        questName.push(data[y][2]);
        ansName.push(data[y][3]);
    }
    let r = [];
    r.push(roundName, catName, questName, ansName, max);
    convertData(r, sheet);
}

function convertData(rArray, shtNo) {
    switch (shtNo) {
        case 1:
            globalThis.round1 = rArray;
            break;
        case 2:
            globalThis.round2 = rArray;
            break;
        case 3:
            globalThis.round3 = rArray;
            break;
        case 4:
            globalThis.round4 = rArray;
            break;
        case 5:
            globalThis.round5 = rArray;
            break;
        case 6:
            globalThis.round6 = rArray;
            break;
        case 7:
            globalThis.round7 = rArray;
            break;
        case 8:
            globalThis.round8 = rArray;
            break;
        case 9:
            globalThis.round9 = rArray;
            break;
    }
}
