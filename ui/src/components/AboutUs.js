import React from 'react';
import {NavLink} from 'react-router-dom';

function AboutUs() {
  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div></div>
                    <h1 className="text-center">What is Disposable Temporary E-mail?</h1>
                    <p className="text-center"><strong>Disposable email</strong> - is a service that allows to receive email at a<br /> temporary address that self-destructed after a certain time elapses. It<br /> is also known by names like : tempmail, 10minutemail, throwaway email,
                        <br />fake-mail or trash-mail. Many forums, Wi-Fi owners, websites and blogs <br />ask visitors to register before they can view content, post comments or <br />download something. Temp-Mail - is most advanced throwaway email service<br />                        that helps you avoid spam and stay safe.</p>
                    <h1 className="text-center">How mush it costs</h1>
                    <p className="text-center">Using our website is tottaly free , using our API is free for now .</p>
                </div>
                <div className="col"></div>
                <div className="col-md-4"></div>
            </div>
        </div>
    </div>
  );
}

export default AboutUs;
