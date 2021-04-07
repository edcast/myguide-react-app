import { CSSProperties } from "react";
import "./content.css";
import "./css/style.css";
import { MessageTypes } from "./types";


const body = document.getElementsByTagName("body");
if(!document.getElementById("gss-myguide-container")){
  const myguideElem = document.createElement('wgss');
  myguideElem.id="gss-myguide-container";

  const html = getSidePanelIFrame() +"<wgss id='gss-toast-msg'></wgss>";
  myguideElem.innerHTML = html;
  body[0].appendChild(myguideElem);
  var m = {
    action: 'GM:action:to_background;task:disable_browser_action_popup'
  };
  chrome.runtime.sendMessage(m, function() {});
}

// const snowflakesContainer = document.createElement("div");
// snowflakesContainer.className = "snowflakes";
// snowflakesContainer.setAttribute("aria-hidden", "true");

// const snowflake = document.createElement("div");
// snowflake.className = "snowflake";
// snowflake.innerHTML = "❆";

function getSidePanelIFrame(){
  console.log("inside getSidePanelIFrame");
  let hostname = window.location.hostname;
  // remove any subdomains, e.g. www.example.com -> example.com
  let domain = hostname.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/);


  let u = chrome.runtime.getURL('index.html')+"?domainName="+domain;
  let html = "<wgss id='gss-panel' class='gss-panel' >";
  let cname = 'gss-app';
  html += "<iframe id='gss-app' name='guideme-iframe' "+
          "	class='" + cname + "'" +
          "	src='" + u + "' allowfullscreen='true'  allow='microphone; camera' ></iframe> " +
          "</wgss>";

  return html;
}

chrome.runtime.onMessage.addListener((message: any , sender: any) => {
  console.log("msg ",message);
  message = JSON.parse(message);
  console.log("parsed msg ",message);
  switch (message.action) {
    case 'GM:action:browser_action_icon_click':
      console.log("icon click");
      openAppPanel();
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

function openAppPanel(){
 
  const elem:any = document.getElementById("gss-panel") as any;
  elem.setAttribute("style", "right: 0px;");

}

// for (let i = 0; i < 12; i++) {
//   snowflakesContainer.appendChild(snowflake.cloneNode(true));
// }

// chrome.runtime.sendMessage({ type: "REQ_SNOW_STATUS" });

// let snowing = false;
// chrome.runtime.onMessage.addListener((message: MessageTypes) => {
//   switch (message.type) {
//     case "SNOW_STATUS":
//       if (message.snowing) {
//         if (!snowing) {
//           body[0]?.prepend(snowflakesContainer);
//         }
//       } else {
//         snowflakesContainer.parentNode?.removeChild(snowflakesContainer);
//       }
//       snowing = message.snowing;
//       break;
//     default:
//       break;
//   }
// });
