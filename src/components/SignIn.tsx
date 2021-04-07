import * as React from 'react';
import * as ReactDOM from "react-dom";
import axios from 'axios';
import { ClosePanelIcon } from '../icon/closePanelIcon';
import { userSignIn } from '../Api';
import {Storage} from '../Storage';


const SignIn: React.FC = () => {
    let [email, setEmail] = React.useState<string>('');
    let [pwd, setPwd] = React.useState<string>('');
    const [user,setUser] = Storage('user'); 

    const onSubmitClick = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log("event", e);
        var data = {
            "email_id": email,
            "password": pwd,
            "keep_login": 1
        };
        userSignIn(data,onSubmitCB);
    };

    const onSubmitCB=(data: any) =>{
        setUser(data);
        var mountNode = document.getElementById('ege-panel');
        ReactDOM.render(<div>Sign In Successfull... inside SignIn</div>, mountNode);
    };

    return <div>
        <div id="ege-header" className="ege-panel-header">
            <div className="gss-panel-header-wrapper gss-width-100 gss-display-flex 
                gss-align-items-center gss-justify-content-space-between">
                <div className="gss-inline-block-vm gss-width-100">
                    <div className="gss-inline-block-vm gss-float-right">
                        <div className="gss-close-panel-btn-wrapper gss-float-left gss-position-relative 
                            gss-cursor-pointer gss-show-text-tooltip">
                            <div id="gss-icon-close-app-panel" className="gss-close-panel-btn gss-position-center">
                                <svg className="gss-position-center gss-width-height-100" viewBox="0 0 12 12" fill="none" xmlns="https://www.w3.org/2000/svg">
                                    <path d="M7.32166 6.00059L11.8083 1.51376C11.9317 1.39024 11.9998 1.22546 12 1.04976C12 0.873952 11.9319 0.708977 11.8083 0.58566L11.4151 0.192586C11.2915 0.0687815 11.1267 0.000976562 10.9508 0.000976562C10.7752 0.000976562 10.6104 0.0687815 10.4868 0.192586L6.0002 4.67912L1.51337 0.192586C1.38995 0.0687815 1.22507 0.000976562 1.04927 0.000976562C0.873659 0.000976562 0.70878 0.0687815 0.585366 0.192586L0.192 0.58566C-0.064 0.84166 -0.064 1.25805 0.192 1.51376L4.67873 6.00059L0.192 10.4872C0.0684878 10.6109 0.000487805 10.7757 0.000487805 10.9514C0.000487805 11.1271 0.0684878 11.2919 0.192 11.4155L0.585268 11.8086C0.708683 11.9323 0.873658 12.0002 1.04917 12.0002C1.22498 12.0002 1.38985 11.9323 1.51327 11.8086L6.0001 7.32195L10.4867 11.8086C10.6103 11.9323 10.7751 12.0002 10.9507 12.0002H10.9509C11.1266 12.0002 11.2914 11.9323 11.415 11.8086L11.8082 11.4155C11.9316 11.292 11.9997 11.1271 11.9997 10.9514C11.9997 10.7757 11.9316 10.6109 11.8082 10.4873L7.32166 6.00059Z" fill="#B3B3B3"></path>
                                </svg>
                            </div>
                            <div className="gss-title-tooltip-wrapper gss-position-bottom-center gss-margin-tb-10">
                                <div className="gss-tooltip-title ng-binding">Close panel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gss-header-banner-wrapper gss-position-relative">
                <div className="gss-inline-block-vm">
                    <ClosePanelIcon></ClosePanelIcon>
                </div>
                <img id="gss-header-widget-icon" className="gss-header-widget-icon" src="../common/img/logo-admin.png" />
            </div>
        </div>
        <div className="ege-panel-main-container gss-signin-page-container gss-overflow gss-overflow-y 
            gss-no-padding" >
            <div className="gss-signin-page-wrapper">
                <form name="form.signin" onSubmit={onSubmitClick} className="ng-valid-email ng-invalid ng-invalid-required ng-valid-pattern 
                    ng-valid-maxlength ng-valid-minlength ng-dirty ng-submitted">
                    <div className="gss-signin-form-container">
                        <div className="gss-signin-form-input">
                            <div className="gss-input-email-wrapper gss-margin-tb-10">
                                <div className="gss-text-align-left gss-login-field-label">Email ID</div>
                                <input id="gss-input-login-email" className="gss-input-type-text gss-font-size-13 
                                    gss-inline-block-vm ng-valid-email ng-valid-pattern ng-valid-maxlength ng-not-empty 
                                    ng-dirty ng-valid ng-valid-required ng-touched"
                                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" />
                                <div className="error-input-wrapper emailid-error-wrapper ng-binding" >Please enter a valid Email ID</div>
                            </div>
                            <div className="gss-input-password-wrapper gss-margin-tb-10" >
                                <div className="gss-text-align-left gss-login-field-label ng-binding">Password</div>
                                <input id="gss-input-login-pass" className="gss-input-type-text gss-font-size-13 
                                    ege-inline-block-vm ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required 
                                    ng-valid-minlength ng-valid-maxlength"
                                    type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Password" name="password" />

                                <div className="error-input-wrapper password-error-wrapper ng-binding" >Password must be 8 digit long</div>
                            </div>
                        </div>
                        <div className="gss-clear"></div>
                        <div className="gss-margin-tb-20 gss-text-align-center">
                            <button id="gss-btn-login-title" type="submit" className="gss-btn-default gss-btn-large gss-font-size-16 ng-binding"
                            >Login</button>
                        </div>
                        <div className="gss-float-right gss-options-wrapper gss-single-option-wrapper">
                            <div className="gss-optional-element-wrapper gss-float-left" >
                                <input id="gss-checkbox-login-remember" className="gss-checkbox gss-float-left 
                                    gss-input-checkbox-custom ng-pristine ng-untouched ng-valid ng-empty"
                                    type="checkbox" ng-model="user.keepLogin" ng-disabled="disableLogin" ng-checked="1"
                                    checked />
                                <div className="gss-margin-lr-5 gss-float-left ng-binding">Remember Me</div>
                            </div>
                            <div id="gss-label-login-forgot-pass" className="gss-options-label gss-text-align-center 
                                gss-cursor-pointer gss-font-size-15 gss-inline-block-vm ng-binding" >Forgot Password?</div>
                        </div>
                        <div className="gss-clear"></div>
                    </div>
                </form>

                <div className="gss-login-page-separator gss-margin-tb-15 ng-scope" >
                    <div className="gss-login-page-separator-inner">OR</div>
                </div>
                <div className="login-with-edcast-container login-page-gray-blocks ng-scope" >
                    <form name="form.loginEdcast" className="ng-pristine ng-invalid ng-invalid-required">
                        <div className="page-title-wrapper ng-scope">
                            <div className="gss-text-align-left gss-login-field-label gss-inline-block-vm ng-binding">Login with EdCast</div>
                        </div>
                        <div className="wrapper-gray-blocks">
                            <input id="gss-input-team-domain" className="gss-input-type-text gss-font-size-13 gss-inline-block-vm 
                                gss-no-border-radius-right ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" type="text"
                                placeholder="Enter team URL" name="teamDomain" />
                            <div className="gss-text-align-center edcast-login-btn">
                                <button id="gss-btn-login" className="gss-btn-default gss-btn-large gss-font-size-16 
                                    gss-no-border-radius-left ng-binding" >Login</button>
                            </div>
                        </div>

                        <div className="ege-clear"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>;
};

export default SignIn;



