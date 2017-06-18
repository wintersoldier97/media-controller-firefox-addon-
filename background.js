const CSS = "body { border: 5px solid blue; }";
const TITLE_APPLY = "On media-controller";
const TITLE_REMOVE = "off media-controller";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

/*
Toggle CSS: based on the current title, insert or remove the CSS.
Update the page action's title and icon to reflect its state.
*/
function toggleCSS(tab) {

  function gotTitle(title) {
    if (title === TITLE_APPLY) {
      browser.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
      browser.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
      //console.log("hello");
      browser.tabs.insertCSS({code: CSS});
    } else {
      browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
      browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
      //console.log("bye");
      browser.tabs.removeCSS({code: CSS});
    }
  }

  var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
  gettingTitle.then(gotTitle);
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
  var anchor =  document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
    browser.pageAction.show(tab.id);
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Toggle CSS when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(toggleCSS);

/* Event listener for key press
document.addEventListener('keydown',fucntion(event){
  var keypressed = event.keycode;
  window.console.log("the key selected is:" + keypressed);
});
*/
/*
document.addEventListener("keydown",function(event) {
    var key_pressed = event.keycode;
    browser.tabs.executeScript(null, {
      file: "input.js"
    });
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {beastURL: key_pressed});
    });
  }
});
*/
/* INTERCEPTING HTTP REQUESTS TO PREVENT LOADING OF IMAGES */
/*function logURL(requestDetails) {
  console.log("Loading: " + requestDetails.url);
}

browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"],types:["image"]}
);
*/
var pattern = "https://mdn.mozillademos.org/*";
//var pattern = "<all_urls>";
var redirect_url = "https://techreport.com/forums/styles/canvas/theme/images/no_avatar.jpg";
function redirect(requestDetails) {
  console.log("Redirecting: " + requestDetails.url);
  return {
    redirectUrl: "https://techreport.com/forums/styles/canvas/theme/images/no_avatar.jpg"
    //redirectUrl: redirect_url;
    //redirectUrl: "extensions/off.svg";
  };
}

browser.webRequest.onBeforeSendHeaders.addListener(
  redirect,
  {urls:[pattern], types:["image"]},
  ["blocking"]
);
