import * as React from "react";
import * as ReactDOM from "react-dom";
import SignIn from "./components/SignIn";
import "./css/style.css";



const main = () => {

	var mountNode = document.getElementById('ege-panel');
	ReactDOM.render(<SignIn />, mountNode);
};
main();




