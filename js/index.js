document.addEventListener('mousemove', (event) => {
    const mouseDiv = document.getElementById('mouse');
    if (mouseDiv) {
        mouseDiv.style.display = 'flex';
        mouseDiv.style.position = 'absolute';
        mouseDiv.style.left = `${event.clientX}px`;
        mouseDiv.style.top = `${event.clientY}px`;
    }
});

window.onload = () => {


}