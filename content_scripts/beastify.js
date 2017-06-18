/*
beastify():
* removes every node in the document.body,
* then inserts the chosen beast
* then removes itself as a listener
*/
function beastify(request, sender, sendResponse) {
//  removeEverything();
  insertBeast(request.beastURL);
  browser.runtime.onMessage.removeListener(beastify);
}

/*
Remove every node under document.body
*/
function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

/*
Given a URL to a beast image, create and style an IMG node pointing to
that image, then insert the node into the document.
*/
function insertBeast(beastURL) {
  //var beastImage = document.createElement("img");
  if(beastURL=="speed++" || beastURL=='a') {
      document.querySelector('video').playbackRate = document.querySelector('video').playbackRate + 0.1;
  }
  if(beastURL=="speed--" || beastURL=='s') {
    document.querySelector('video').playbackRate = document.querySelector('video').playbackRate - 0.1;
  }
  if(beastURL=="fastfoward" || beastURL=='x') {
    document.querySelector('video').currentTime = document.querySelector('video').currentTime + 10;
  }
  if(beastURL=="rewind" || beastURL=='z') {
    document.querySelector('video').currentTime = document.querySelector('video').currentTime - 10;
  }
  if(beastURL=="play" || beastURL=='p') {
    document.querySelector('video').play();
  }
  if(beastURL=="pause" || beastURL=='o') {
    document.querySelector('video').pause();
  }
  /*
  beastImage.setAttribute("src", beastURL);
  beastImage.setAttribute("style", "width: 100vw");
  beastImage.setAttribute("style", "height: 100vh");
  document.body.appendChild(beastImage);*/
}
/*
Assign beastify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(beastify);
