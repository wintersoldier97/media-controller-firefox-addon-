document.querySelector('video').playbackRate = 2;
console.log("test message");
var flag = 0;
function insertBeast(beastURL) {
  //var beastImage = document.createElement("img");
  if(beastURL==']') {
      document.querySelector('video').playbackRate = document.querySelector('video').playbackRate + 0.1;
  }
  if(beastURL=='[') {
    document.querySelector('video').playbackRate = document.querySelector('video').playbackRate - 0.1;
  }
  if(beastURL=='x') {
    document.querySelector('video').currentTime = document.querySelector('video').currentTime + 10;
  }
  if(beastURL=='z') {
    document.querySelector('video').currentTime = document.querySelector('video').currentTime - 10;
  }
  if(beastURL=='p') {
    document.querySelector('video').play();
    flag=0;
  }
  if(beastURL=='o') {
    flag=1;
    document.querySelector('video').pause();
  }
  /*
  beastImage.setAttribute("src", beastURL);
  beastImage.setAttribute("style", "width: 100vw");
  beastImage.setAttribute("style", "height: 100vh");
  document.body.appendChild(beastImage);*/
}
/*$(document).on("keypress",fucntion(e) {
    console.log(e.which+" asdfhasodfh");
});*/
/*
document.onkeypress = function(e) {
    e = e || window.event;
    cosole.log(e);
}*//*
document.addEventListener('keydown',fucntion(event){
  var keypressed = event.keycode;
  console.log("the key selected is: " + keypressed);
});
*/
document.addEventListener("keydown", (e) => {
  //var key_pressed = e.key;
  //console.log("hello "+key_pressed);
  //insertBeast(key_pressed);
  /*if (e.target.classList.contains("beast")) {*/
    var chosenBeast = e.key;
    console.log("hello " + chosenBeast);
    insertBeast(chosenBeast);
    /*
    //var chosenBeastURL = beastNameToURL(chosenBeast);
    console.log("hello  "+chosenBeast);
    browser.tabs.executeScript(null, {
      file: "/content_scripts/beastify.js"
    });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {beastURL: chosenBeast});
    });*/
  //}
});
