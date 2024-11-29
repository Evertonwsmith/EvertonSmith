window.onload = function () {
    const mouseFollow = document.getElementById('mouseFollow');
    let prevX = -50;
    let prevY = -50;
    let click = 0;

    // Click event listener
    document.addEventListener('click', function (e) {
        click++;
        const clickDiv = document.createElement('div');
        clickDiv.className = 'click';
        clickDiv.style.position = 'absolute';
        clickDiv.style.top = e.clientY + 'px';
        clickDiv.style.left = e.clientX + 'px';
        clickDiv.style.width = '10px';
        clickDiv.style.height = '10px';
        clickDiv.style.borderRadius = '50%';
        clickDiv.style.backgroundColor = 'black';
        clickDiv.style.border = '2px solid white';
        clickDiv.style.animation = 'clickAnimation 3s linear forwards';
        document.body.appendChild(clickDiv);

        startMoving(clickDiv, click);
    });

    // Function to add movement animation to the click div
    function startMoving(element, click) {
        switch (click % 3) {
            case 1:
                element.style.animation = 'clickAnimation 3s linear forwards, move1 5s 3s ease infinite alternate';
                break;
            case 2:
                element.style.animation = 'clickAnimation 3s linear forwards, move2 5s 3s ease infinite alternate';
                break;
            case 0:
                element.style.animation = 'clickAnimation 3s linear forwards, move3 5s 3s ease infinite alternate';
                break;
            default:
                break;
        }
    }

    // Mousemove event listener
    document.addEventListener('mousemove', function (event) {
        const randomColorDiv = document.createElement('div');
        randomColorDiv.className = 'dots';
        randomColorDiv.style.position = 'absolute';
        randomColorDiv.style.top = prevY + 'px'; // Use previous values for position
        randomColorDiv.style.left = prevX + 'px';
        randomColorDiv.style.width = '50px';
        randomColorDiv.style.height = '50px';
        randomColorDiv.style.borderRadius = '50%';
        randomColorDiv.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        document.body.appendChild(randomColorDiv);

        // Keep only the last 10 appendChilds
        const dots = document.getElementsByClassName('dots');
        if (dots.length > 10) {
            dots[0].remove();
        }

        // Update the mouse follow element
        mouseFollow.style.top = event.clientY + 'px';
        mouseFollow.style.left = event.clientX + 'px';

        // Update prevX and prevY to the current mouse position
        prevX = event.clientX;
        prevY = event.clientY;
    });
}
