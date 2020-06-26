let body = document.body,
  frame = document.querySelector("#frame"),
  navs = document.querySelectorAll('header nav li'),
  span = document.querySelector('header nav span'),
  scrollable = document.querySelector('#scrollable'),
  message = document.getElementById("message"),
  inputs = document.querySelectorAll('.inputText'),
  labels = document.querySelectorAll('.floating-label'),
  articles = document.querySelectorAll('article'),
  work_cards = document.querySelectorAll('.work-card'),
  yPos = -100,
  // active page index
  counter = 0,
  isAnimating = false,
  stopTimer = null;

let parseStyle = (style) => {
  return style ? parseInt(style.match(/-?\d+/)) : 0;
}

let clearSelected = () => {
  let selected = document.querySelector('.selected');
  if (selected) {
    selected.classList.remove('selected');
  }
}

setup = () => {
  body.classList.add('animation-stopper');
  isAnimating = true;

  clearTimeout(stopTimer);

  let current = navs[counter];

  current.classList.toggle('active');

  span.style.width = navs[1].offsetWidth + 'px';
  span.style.left = navs[yPos / -100].offsetLeft + 'px';

  articles[0].addEventListener('scroll', doNothing);
  articles[0].addEventListener('wheel', doNothing);
  articles[0].addEventListener('touchstart', doNothing);

  // clearSelected();
  // work_cards[1].classList.add('selected');

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

frame.addEventListener('scroll', (e) => {
  console.log(frame.scrollTop);

  if (frame.scrollTop >= articles[3].offsetTop - 100) {
    yPos = -300;
    toggleActive();
  } else if (frame.scrollTop >= articles[2].offsetTop - 100) {
    yPos = -200;
    toggleActive();
  } else {
    yPos = -100;
    toggleActive();
  }
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

let ccustomScrollTo = (pos) => {
  pageTransition('up', pos / -100);
}

let customScrollTo = (pos) => {
  isSlideMode = document.querySelector('.slideMode') ? true : false;

  isAnimating = true;

  if (yPos == pos) {
    isAnimating = false;
    return;
  } else if (yPos > pos) {
    pageTransition('up', pos / -100);
  } else {
    pageTransition('down', pos / -100);
  }

  if (isSlideMode) {
    if (yPos == pos) {
      isAnimating = false;
      return;
    } else if (yPos > pos) {
      pageTransition('up', pos / -100);
    } else {
      pageTransition('down', pos / -100);
    }
  } else {
    frame.scrollTo(0, articles[pos / -100].offsetTop);
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
