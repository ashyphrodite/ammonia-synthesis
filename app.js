/*
window.onbeforeunload = function () {
    window.scrollTo(0,0);
};
*/

function start() {
    document.getElementById("bodyA").scrollIntoView({behavior: 'smooth', block: 'start'});
}

function next() {
    document.getElementById("bodyB").scrollIntoView({behavior: 'smooth', block: 'start'});
}

window.onload = function() {
    // bodyA background
    document.getElementById("bodyA").style.backgroundImage = 'url("images/crops.webp")';
    document.getElementById("bodyA").style.backgroundRepeat = "no-repeat";
    document.getElementById("bodyA").style.backgroundSize = "cover";
    var i = 1;

    function changeImageA() {   
        var bodyAImages = [
            "images/crops.webp",
            "images/crowded.jpg",
            "images/cows.jpg",
            "images/wheatfield.jpg",
        ]
        i = i + 1;
        if (i >= 4) {
            i = 0;
        }
        document.getElementById("bodyA").style.backgroundImage = 'url("' + bodyAImages[i] + '")';
    }
    window.setInterval(changeImageA, 5000);

    // bodyB
    document.getElementById("bodyB").style.backgroundImage = 'url("images/tnt_storage.jpg")';
    document.getElementById("bodyB").style.backgroundRepeat = "no-repeat";
    document.getElementById("bodyB").style.backgroundSize = "cover";

    function changeImageB() {   
        var bodyAImages = [
            "images/beirut_aftermath.webp",
            "images/tnt_storage.jpg",
            "images/beirut_explosion.jpg",
            "images/chlorine_gas.jpg",
        ]
        document.getElementById("bodyB").style.backgroundImage = 'url("' + bodyAImages[i] + '")';
    }
    window.setInterval(changeImageB, 5000);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));

const leftAnchor = document.getElementById("left-eye");
const rightAnchor = document.getElementById("right-eye");


document.addEventListener('mousemove', (e) => {

    const leftRect = leftAnchor.getBoundingClientRect();
    const leftAnchorX = leftRect.left;
    const leftAnchorY = leftRect.top + leftRect.height / 2;

    const rightRect = rightAnchor.getBoundingClientRect();
    const rightAnchorX = rightRect.left;
    const rightAnchorY = rightRect.top + rightRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const leftAngle = angle(mouseX, mouseY, leftAnchorX, leftAnchorY);
    const rightAngle = angle(mouseX, mouseY, rightAnchorX, rightAnchorY);

    leftEye = document.querySelectorAll('.left-eye')
    leftEye.forEach(eye => {
        eye.style.transform = 'rotate(' + (leftAngle - 90) + 'deg)';
    })

    rightEye = document.querySelectorAll('.right-eye')
    rightEye.forEach(eye => {
        eye.style.transform = 'rotate(' + (rightAngle - 90) + 'deg)';
    })
})

function angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = rad * 180 / Math.PI;

    return deg;
}