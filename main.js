let body = document.body,
  frame = document.querySelector("#frame"),
  navs = document.querySelectorAll('header nav li'),
  span = document.querySelector('header nav span'),
  scrollable = document.querySelector('#scrollable'),
  message = document.getElementById("message"),
  // animation_screens = document.querySelectorAll('.animation-screen'),
  labels = document.querySelectorAll('.floating-label'),
  articles = document.querySelectorAll('article'),
  yPos = 0,
  // active page index

  counter = 0;
isAnimating = false;

let stopTimer;

let parseStyle = (style) => {
  return style ? parseInt(style.match(/-?\d+/)) : 0;
}

setup = () => {
  body.classList.add('animation-stopper');
  isAnimating = true;

  clearTimeout(stopTimer);

  // let c = parseStyle(scrollable.style.top) / -100,
  //   current = navs[c];
  let current = navs[counter];

  current.classList.toggle('active');

  span.style.width = navs[1].offsetWidth + 'px';
  span.style.left = navs[1].offsetLeft + 'px';

  console.log(window.matchMedia('(min-width: 500px) and (min-height: 450px)').matches);
  console.log(window.matchMedia('(max-width: 500px) and (min-height: 600px)').matches);
  console.log(window.matchMedia('(min-width: 500px) and(min-height: 450px)').matches || window.matchMedia('(max-width: 500px) and (min-height: 600px)').matches);
  // attachListenersToArticles();
  if (window.matchMedia('(min-width: 500px) and(min-height: 450px)').matches || window.matchMedia('(max-width: 500px) and (min-height: 600px)').matches) {
    body.classList.add('slideMode');
    attachListenersToArticles();
  } else {
    body.classList.remove('slideMode');
    console.log('removed');
    detachListenersFromArticles();
  }

  stopTimer = setTimeout(() => {
    body.classList.remove('animation-stopper');
    isAnimating = false;
  }, 100);
}

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

// Event listeneer functions 
let onTransitionEnd = () => {
  setTimeout(() => {
    isAnimating = false;
  }, 500);
};

let onWheel = (e) => {
  if (!isAnimating) {
    if (e.deltaY > 0) {
      customScroll('up');
    } else if (e.deltaY < 0) {
      customScroll('down');
    }
  }
};

let onTouchStart = (e) => {
  let touchObj = e.changedTouches[0];
  swipeDir = 'none';
  //distX = 0;
  distY = 0;
  //startX = touchObj.pageX;
  startY = touchObj.pageY;
  startTime = new Date().getTime();
  // e.preventDefault();
};

let onTouchMove = (e) => {
  e.preventDefault(); //prevent scrolling when inside DIV
};

let onTouchEnd = (e) => {
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
};

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

let pageTransition = (dir, page) => {

  if (dir == 'up') {
    while (counter < page) {
      articles[counter].style.top = `-100vh`;
      counter++;
    }
  } else if (dir == 'down') {
    while (counter > page) {
      articles[--counter].style.top = `0vh`;
    }
    // c--;       
  }
}

let customScrollTo = (pos) => {
  isAnimating = true;

  if (yPos == pos) {
    isAnimating = false;
    return;
  } else if (yPos > pos) {
    pageTransition('up', pos / -100);
  } else {
    pageTransition('down', pos / -100);
  }

  yPos = pos;
  toggleActive();
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
  } else if (yPos > -100) {
    yPos = -100;
    isAnimating = false;
    return;
  }
  pageTransition(dir, yPos / -100);
  toggleActive();
};

// Add event listeners to articles
let attachListenersToArticles = () => {
  articles.forEach((article, index) => {

    article.addEventListener("transitionend", onTransitionEnd);

    if (index == 0) return;

    article.addEventListener("wheel", onWheel);

    article.addEventListener("touchstart", onTouchStart);
    article.addEventListener("touchmove", onTouchMove);
    article.addEventListener("touchend", onTouchEnd);
  });
}

let detachListenersFromArticles = () => {
  articles.forEach((article, index) => {

    article.removeEventListener("transitionend", onTransitionEnd);

    if (index == 0) return;

    article.removeEventListener("wheel", onWheel);

    article.removeEventListener("touchstart", onTouchStart);
    article.removeEventListener("touchmove", onTouchMove);
    article.removeEventListener("touchend", onTouchEnd);
  });
}

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

// Animate input placeholder
let typeTimer;

startTyping = (node_index) => {
  let node = labels[node_index],
    text = labels[node_index].innerHTML,
    c = 0,
    l = text.length,
    inc = +1;

  typeTimer = setInterval(() => {

    c += inc;
    node.innerHTML = text.substr(0, c);

    // if (c == l) c = 0;

    if (c == l) stopTyping(node_index);
    // startTyping(labels[1]);
  }, 150)
}

stopTyping = (node_index) => {
  clearInterval(typeTimer);
  startTyping((node_index + 1) % 4);
}

startTyping(0);

// Toggle theme
toggleTheme = () => {
  // body.classList.toggle('dark');
  return;
}