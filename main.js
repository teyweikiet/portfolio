let scrollY = 0,
    body = document.querySelector("body"),
    scrollable = document.querySelector('#scrollable'),
    isAnimating = false;
    // isWheeling = False,
    
frame = document.getElementById("frame");

// toggleMenu = (btn) => {document.querySelector('header').classList.toggle('change');}

toggleTheme = () => {
    body.classList.toggle('dark');
}

document.addEventListener('drag', (e) => {
    // body.style.overflow = 'hidden';
    console.log(window.scrollY);
    // if (window.scrollY > scrollY) {
    //     scrollY += 100;
    //     frame.style.top = -1 * scrollY + `vh`;
    // }
    // body.style.overflow = 'auto';
});

document.addEventListener('wheel', (e) => {
    console.log('wheel');

    if (!isAnimating) {
        if (e.deltaY < 0) {
            console.log(-1);
            customScroll(-1);
        } else if (e.deltaY > 0) {
            console.log(1);
            customScroll(1);
        }
    }
    
    // if (event.deltaY < 0) {
    //     // console.log('scrolling up');
    //     customScroll(1);
    // } else if (event.deltaY > 0) {
    //     // console.log('scrolling down');
    //     customScroll(-1);
    // }
})

customScroll = (dir) => {
    isAnimating = true;

    if (dir == 1) {
        scrollY -= 100;
    } else if (dir == -1) {
        scrollY += 100;
    }

    console.log(scrollY);
    scrollY = Math.min(Math.max(scrollY, -200), 0);

    frame.style.top = scrollY + `vh`;
    // if (!isAnimating) {
    //     scrollY += 100;
    //     frame.style.top = -1 * scrollY + `vh`;
    //     isAnimating = true;
    // } 
}

body.addEventListener('transitionend', () => {
    isAnimating = false;
    console.log(isAnimating);
});