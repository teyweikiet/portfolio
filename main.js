let body = document.body,
  frame = document.querySelector("#frame"),
  navs = document.querySelectorAll('header nav li'),
  span = document.querySelector('header nav span'),
  scrollable = document.querySelector('#scrollable'),
  message = document.getElementById("message"),
  yPos = 0,
  isAnimating = false;

let stopTimer;

let parseStyle = (style) => {
    return style? parseInt(style.match(/-?\d+/)): 0;
}

setup = () => {
  body.classList.add('animation-stopper');

  clearTimeout(stopTimer);

  let c = parseStyle(scrollable.style.top) / -100,
      current = navs[c];

  current.classList.toggle('active');

  span.style.width = current.offsetWidth + 'px';
  span.style.left = current.offsetLeft + 'px';

  stopTimer = setTimeout(() => {
    body.classList.remove('animation-stopper');
  }, 100);
}

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
  let touchObj = e.changedTouches[0];
  swipeDir = 'none';
  //distX = 0;
  distY = 0;
  //startX = touchObj.pageX;
  startY = touchObj.pageY;
  startTime = new Date().getTime();
  // e.preventDefault();
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
    if (Math.abs(distY) >= threshold) { // && Math.abs(distX) <= restraint) {
      swipeDir = (distY < 0) ? 'up' : 'down';
      console.log('swipeDir');
    }
  }
  // e.preventDefault();
  console.log('touchend', swipeDir, distY);
  customScroll(swipeDir);
});

let toggleActive = () => {
  let c = yPos / -100,
    current = navs[c];

  let active = document.querySelector('.active');

  if (active) {
    active.classList.remove('active');
  }

  span.style.left = `${current.offsetLeft}px`;
  current.classList.add('active');
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
    console.log('ended')
    isAnimating = false;
  }, 600);
});

// Form validation
message.addEventListener("focusout", () => {
  if (message.innerHTML == '') {
    message.classList.add('invalid');
    console.log('invalid');
  } else {
    message.classList.remove('invalid');
    console.log('valid');
  }
})

document.querySelector('form').addEventListener('submit', (e) => {
  if (document.querySelector('.invalid')) {
    console.log('invalid');
    e.preventDefault();
  }
})

// Toggle theme
toggleTheme = () => {
  // body.classList.toggle('dark');
  return;
}

// TODO: scroll horizontally in mobile?