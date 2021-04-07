import { MessageTypes } from "./types";

const sendSnowStatus = (snowing: boolean) => {
  const message = { type: "SNOW_STATUS", snowing };

  // send message to popup
  chrome.runtime.sendMessage(message);

  // send message to every active tab
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
};

let snowing = false;

// Get locally stored value
chrome.storage.local.get("snowing", (res) => {
  if (res["snowing"]) {
    snowing = true;
  } else {
    snowing = false;
  }
});

chrome.runtime.onMessage.addListener((message: any , sender: any) => {
  switch (message.action) {
    case 'GM:action:to_background;task:disable_browser_action_popup':
        disablePopUP(sender.tab);
			break;
  }
  // switch (message.type) {
  //   case "REQ_SNOW_STATUS":
  //     sendSnowStatus(snowing);
  //     break;
  //   case "TOGGLE_SNOW":
  //     snowing = message.snowing;
  //     chrome.storage.local.set({ snowing: snowing });
  //     sendSnowStatus(snowing);
  //     break;
  //   default:
  //     break;
  // }
});

chrome.browserAction.onClicked.addListener(function() {
  console.log("onClicked");
	chrome.tabs.query({
		active: true,
		currentWindow: true,
	}, function(tabs:any) {
		var ob = {
			action: "GM:action:browser_action_icon_click"
		};
    chrome.tabs.sendMessage(tabs[0].id,JSON.stringify(ob));
	});
});

function disablePopUP(tab: { url: string; id: any; }){
  if (tab.url != "") {
		chrome.browserAction.setPopup({
			tabId: tab.id,
			popup: '' // Open this html file within the popup.
		});
	}
}
