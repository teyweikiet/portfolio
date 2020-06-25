//TODO: remove yPos, use counter

let body = document.body,
  frame = document.querySelector("#frame"),
  navs = document.querySelectorAll('header nav li'),
  span = document.querySelector('header nav span'),
  scrollable = document.querySelector('#scrollable'),
  message = document.getElementById("message"),
  inputs = document.querySelectorAll('.inputText'),
  labels = document.querySelectorAll('.floating-label'),
  articles = document.querySelectorAll('article'),

  // TODO:yPos = -100,

  // active page index
  counter = 0,
  isAnimating = false,
  stopTimer = null;

let parseStyle = (style) => {
  return style ? parseInt(style.match(/-?\d+/)) : 0;
}

let updateSpan = () => {
  span.style.width = navs[counter].offsetWidth + 'px';
  // span.style.left = navs[counter].offsetLeft + 'px';
}

setup = () => {
  body.classList.add('animation-stopper');
  isAnimating = true;

  clearTimeout(stopTimer);

  let current = navs[counter];

  // counter++; //TODO:

  //TODO: current.classList.toggle('active');


  //TODO: span.style.width = navs[1].offsetWidth + 'px';
  //TODO: span.style.left = navs[yPos / -100].offsetLeft + 'px';
  updateSpan(); //TODO:

  if (window.matchMedia('(min-width: 500px) and (min-height: 450px)').matches || window.matchMedia('(max-width: 500px) and (min-height: 600px)').matches) {
    body.classList.add('slideMode');
    attachListenersToArticles();
  } else {
    body.classList.remove('slideMode');
    detachListenersFromArticles();
  }

  // Disable scroll on #home
  articles[0].addEventListener('scroll', doNothing);
  articles[0].addEventListener('wheel', doNothing);
  articles[0].addEventListener('touchstart', doNothing);

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
let doNothing = (e) => {
  e.preventDefault();
}

let onTransitionEnd = () => {
  setTimeout(() => {
    isAnimating = false;
  }, 500);
};

let onWheel = (e) => {
  e.stopPropagation();

  if (!isAnimating) {
    if (e.deltaY > 0) {
      customScroll('up');
    } else if (e.deltaY < 0) {
      customScroll('down');
    }
  }
};

let onTouchStart = (e) => {
  e.stopPropagation();

  let touchObj = e.changedTouches[0];
  swipeDir = 'none';
  //distX = 0;
  distY = 0;
  //startX = touchObj.pageX;
  startY = touchObj.pageY;
  startTime = new Date().getTime();
  // e.preventDefault();
};

// let onTouchMove = (e) => {
//   e.stopPropagation();
//   e.preventDefault(); //prevent scrolling when inside DIV
// };

let onTouchEnd = (e) => {
  e.stopPropagation();

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

frame.addEventListener('scroll', (e) => {
  console.log(frame.scrollTop);

  if (frame.scrollTop >= articles[3].offsetTop - 100) {
    
    //TODO: yPos = -300;
    counter = 3;

    toggleActive();
  } else if (frame.scrollTop >= articles[2].offsetTop - 100) {
    
    //TODO: yPos = -200;
    counter = 2;
    
    toggleActive();
  } else {
    
    //TODO: yPos = -100;
    counter = 1;

    toggleActive();
  }
});

let toggleActive = () => {

  let c = counter, //TODO: yPos / -100,
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
      console.log(counter);
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

let ccustomScrollTo = (pos) => {
  counter = pos;
  pageTransition('up', counter);
  toggleActive;
}

let customScrollTo = (pos) => {
  isSlideMode = document.querySelector('.slideMode') ? true : false;

  isAnimating = true;

  //TODO: if (yPos == pos) {
  //   isAnimating = false;
  //   return;
  // } else if (yPos > pos) {
  //   pageTransition('up', pos / -100);
  // } else {
  //   pageTransition('down', pos / -100);
  // }

  if (counter == pos) {
    isAnimating = false;
    return;
  } else if (counter > pos) {
    pageTransition('up', pos);
  } else {
    pageTransition('down', pos);
  }

  //TODO: if (isSlideMode) {
  //   if (yPos == pos) {
  //     isAnimating = false;
  //     return;
  //   } else if (yPos > pos) {
  //     pageTransition('up', pos / -100);
  //   } else {
  //     pageTransition('down', pos / -100);
  //   }
  // } else {
  //   frame.scrollTo(0, articles[pos / -100].offsetTop);
  // }

  if (isSlideMode) {
    if (counter == pos) {
      isAnimating = false;
      return;
    } else if (counter > pos) {
      pageTransition('up', pos);
    } else {
      pageTransition('down', pos);
    }
  } else {
    frame.scrollTo(0, articles[pos].offsetTop);
  }

  counter = pos;
  toggleActive();
}

let customScroll = (dir) => {
  isAnimating = true;

  //TODO: if (dir == 'up') {
  //   yPos -= 100;
  // } else if (dir == 'down') {
  //   yPos += 100;
  // }

  if (dir == 'up') {
    counter -= 1;
  } else if (dir == 'down') {
    counter += 1;
  }

  if (counter > 3) {
    counter = 3;
    isAnimating = false;
    return;
  } else if (counter < 1) {
    counter = 1;
    isAnimating = false;
    return;
  }
  pageTransition(dir, counter);
  toggleActive();
};

// Add event listeners to articles
let attachListenersToArticles = () => {
  articles.forEach((article, index) => {

    article.addEventListener("transitionend", onTransitionEnd);

    if (index == 0) return;

    article.addEventListener("wheel", onWheel);

    article.addEventListener("touchstart", onTouchStart);
    article.addEventListener("touchmove", doNothing);
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
inputs[0].addEventListener("change", () => {
  if (/^[a-zA-Z ]+$/.test(inputs[0].value)) {
    inputs[0].classList.remove('invalid', 'empty');
    // console.log('valid');
  } else {
    inputs[0].classList.add('invalid');
    if (inputs[0].value == '') {
      inputs[0].classList.add('empty');
    } else {
      inputs[0].classList.remove('empty');
    };
    // console.log('invalid');
  }
});

inputs[1].addEventListener("change", () => {
  if (/.+@.+\..+/.test(inputs[1].value)) {
    inputs[1].classList.remove('invalid', 'empty');
    // console.log('valid');
  } else {
    inputs[1].classList.add('invalid');

    if (inputs[1].value == '') {
      inputs[1].classList.add('empty');
    } else {
      inputs[1].classList.remove('empty');
    };
    // console.log('invalid');
  }
});

inputs[2].addEventListener("change", () => {
  if (/^\d{10,11}$/.test(inputs[2].value)) {
    inputs[2].classList.remove('invalid', 'empty');
    console.log('valid');
  } else {
    inputs[2].classList.add('invalid');
    if (inputs[2].value == '') {
      inputs[2].classList.add('empty')
    } else {
      inputs[2].classList.remove('empty')
    };

    console.log('invalid');
  }
});

message.addEventListener("focusout", () => {
  if (message.innerHTML == '') {
    message.classList.add('invalid', 'empty');
    console.log('invalid');
  } else {
    message.classList.remove('invalid', 'empty');
    console.log('valid');
  }
});

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB2DxpX1mDgU5WvpP67ZOD4gdrHLC9MsCw",
  authDomain: "portfolio-8b8a6.firebaseapp.com",
  databaseURL: "https://portfolio-8b8a6.firebaseio.com",
  projectId: "portfolio-8b8a6",
  storageBucket: "portfolio-8b8a6.appspot.com",
  messagingSenderId: "780151023748",
  appId: "1:780151023748:web:4d7a16d40c1f63081efad1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  if (document.querySelector('.invalid')) {
    console.log('invalid');
    return;
  }

  firebase.database().ref().child('message').push({
    name: inputs[0].value,
    email: inputs[1].value,
    phone: inputs[2].value,
    message: inputs[3].innerHTML,
  }, () => {
    inputs.forEach((input, index) => {
      if (index == 3) {
        input.innerHTML = '';
        input.classList.add('invalid');
      } else {
        input.value = '';
      }
    })
  });


});

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