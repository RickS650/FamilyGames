export const showPopup = () => {
    popupContainer.style.display = 'block';
    changePlaceholderText();
};

document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.querySelector('#popupContainer');
    const okButton = document.querySelector('#okButton');
    const cancelButton = document.querySelector('#cancelButton');

    const hidePopup = () => {
        popupContainer.style.display = 'none';
    };

    const handleOkClick = () => {

        capturedTimes[0] = document.getElementById('player1TimeInput').value;
        capturedTimes[1] = document.getElementById('player2TimeInput').value;
        capturedTimes[2] = document.getElementById('player3TimeInput').value;
        capturedTimes[3] = document.getElementById('player4TimeInput').value;
        capturedTimes[4] = document.getElementById('player5TimeInput').value;
        popCalculate();
        hidePopup();
    };

    const handleCancelClick = () => {
        hidePopup();
    };

    okButton.addEventListener('click', handleOkClick);
    cancelButton.addEventListener('click', handleCancelClick);

    function popCalculate() {
        let minDifference = Infinity;

        for (let i = 0; i < capturedTimes.length; i++) {
            const difference = Math.abs(capturedTimes[i] - longTime);

            if (difference < minDifference) {
                minDifference = difference;
                bestElement = [i];
            } else if (difference === minDifference) {
                bestElement.push(i);
            }
        }
        return bestElement;
    }


});
// Function to change the placeholder text
function changePlaceholderText() {

    document.querySelector('label[for="player1TimeInput"]').textContent = globalThis.names[0];
    document.getElementById('player1TimeInput').setAttribute('placeholder', "Time");
    document.querySelector('label[for="player2TimeInput"]').textContent = globalThis.names[1];
    document.getElementById('player2TimeInput').setAttribute('placeholder', "Time");
    document.querySelector('label[for="player3TimeInput"]').textContent = globalThis.names[2];
    document.getElementById('player3TimeInput').setAttribute('placeholder', "Time");
    document.querySelector('label[for="player4TimeInput"]').textContent = globalThis.names[3];
    document.getElementById('player4TimeInput').setAttribute('placeholder', "Time");
    document.querySelector('label[for="player5TimeInput"]').textContent = globalThis.names[4];
    document.getElementById('player5TimeInput').setAttribute('placeholder', "Time");
}