// // Send a message to the active tab
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   var activeTab = tabs[0];
//   chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
// });

// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//     chrome.tabs.executeScript(null,{file:"content.js"});
// });

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "content.js"});
});