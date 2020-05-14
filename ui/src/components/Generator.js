import React, { Component } from 'react';


function Generator(){
        return (
           <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                  <p className="text-center">Your temporary Email adress</p>
                  <div className="input-group">
                      <div className="input-group-prepend"></div><input className="form-control" type="text" />
                      <div className="input-group-append"><button className="btn btn-primary" type="button">COPY</button><button className="btn btn-primary" type="button" style={{backgroundColor: "#4136ba"}}>NEW</button></div>
                  </div>
                  <p className="text-center">Forget about spam, advertising mailings, hacking and attacking robots. <br />Keep your real mailbox clean and secure. Temp Mail provides temporary, <br />secure, anonymous, free, disposable email address</p>
              </div>
              <div className="col-md-4"></div>
          </div>
        );
    }

export default Generator;
