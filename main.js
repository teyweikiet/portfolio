// let scrollY = 0,
let body = document.querySelector("body");
    // scrollable = document.querySelector('#scrollable'),
    // isAnimating = false;
    // isWheeling = False,
    
// frame = document.getElementById("frame");

// toggleMenu = (btn) => {document.querySelector('header').classList.toggle('change');}

toggleTheme = () => {
    body.classList.toggle('dark');
}

let yPos = 0,
  isAnimating = false,
  frame = document.querySelector("#frame"),
  scrollable = document.querySelector("#scrollable");

document.addEventListener("wheel", (e) => {
  frame.style.overflow = 'hidden';
  if (!isAnimating) {
    if (e.deltaY > 0) {
      customScroll(1);
    } else if (e.deltaY < 0) {
      console.log('scroll');
      customScroll(-1);
    }
  }
});

let customScroll = (dir) => {
  isAnimating = true;

  if (dir == 1) {
    yPos -= 100;
  } else {
    yPos += 100;
  }

  if (yPos < -300) {
    yPos = -300;
    isAnimating = false;
    return;
  } else if (yPos > 0) {
    yPos = 0;
    isAnimating = false;
    return;
  }
  scrollable.style.top = yPos + "vh";
};

scrollable.addEventListener("transitionend", () => {
  setTimeout(() => {
    isAnimating = false;
  }, 250);
});

let scrollToId = () => {
  document.getElementById('about').scrollIntoView();
}