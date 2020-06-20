// let scrollY = 0,
let body = document.querySelector("body"),
    navs = document.querySelectorAll('header nav li');
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


scrollable.addEventListener("wheel", (e) => {
  if (!isAnimating) {
    if (e.deltaY > 0) {
      customScroll('up');
    } else if (e.deltaY < 0) {
      customScroll('down');
    }
  }
});

let swipeDir,
  //startX,
  startY,
  //distX,
  distY,
  threshold = 50, //150, // required min distance traveled to be considered swipe
  //restraint = 100, // max dist allowed at the same time in perpendicular
  allowedTime = 500, //200, // max time allowed to travel that distance
  elapsedTime,
  startTime;

scrollable.addEventListener("touchstart", (e) => {
  let touchObj  = e.changedTouches[0];
  swipeDir = 'none';
  //distX = 0;
  distY = 0;
  //startX = touchObj.pageX;
  startY = touchObj.pageY;
  startTime = new Date().getTime(); 
  e.preventDefault();
});

scrollable.addEventListener("touchmove", (e) => {
  e.preventDefault(); //prevent scrolling when inside DIV
});

scrollable.addEventListener("touchend", (e) => {
  var touchObj = e.changedTouches[0];
  //distX = touchObj.pageX - startX; // get horizontal dist traveled by finger while in contact
  distY = touchObj.pageY - startY; // get vertical dist traveled by finger while in contact
  elapsedTime = new Date().getTime() - startTime; //get time elapsed
  if (elapsedTime <= allowedTime) {
    // if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
    //   swipeDir = (distX < 0) ? 'left': 'right'; 
    // } else 
    if (Math.abs(distY) >= threshold ) {// && Math.abs(distX) <= restraint) {
      swipeDir = (distY < 0) ? 'up': 'down';
      console.log('swipeDir');
    }
  }
  e.preventDefault();
  console.log('touchend', swipeDir, distY);
  customScroll(swipeDir);
});


// document.addEventListener("scroll", (e) => {
//   let y = window.scrollY;
//   frame.style.overflow = 'hidden';

//   // TODO: logic to detect scroll up or down
//   if (!isAnimating) {
//     if (y > yPos) {
//       console.log('scroll');
//       customScroll(1);
//     } else if (y < yPos) {
//       console.log('scroll');
//       customScroll(-1);
//     }
//   }
// });
let toggleActive = () => {
  let c = yPos/-100;
  document.querySelector('.active').classList.toggle('active');
  navs[c].classList.toggle('active');
}

let customScrollTo = (pos) => {
  isAnimating = true;

  if (yPos == pos) {
    isAnimating = false;
    return;
  } 

  yPos = pos;
  toggleActive();
  scrollable.style.top = yPos + "vh";
}

let customScroll = (dir) => {
  isAnimating = true;

  if (dir == 'up') {
    yPos -= 100;
  } else if (dir == 'down') {
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
  toggleActive();
  scrollable.style.top = yPos + "vh";
};

scrollable.addEventListener("transitionend", () => {
  setTimeout(() => {
    // frame.style.overflow = 'initial';
    console.log('ended')
    isAnimating = false;
  }, 250);
});

// let scrollToId = () => {document.getElementById('about').scrollIntoView();}

// TODO: is it possible to just prevent default on scroll instead of using wheel & touch event?
