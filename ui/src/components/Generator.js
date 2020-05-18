import React,{Component} from 'react';
import './Generator.css';

class Generator extends Component{
    
    handleCopy(e){
      const mail = document.getElementById("inputMail");  
      mail.select();
      document.execCommand("copy");
    }
    componentDidMount(){
      this.props.renewMail();
    }
     render(){

          return (

           <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                  <p className="text-center">Your temporary Email adress</p>
                  <p id="mailInvalid" className="text-center text-danger validityOfMail">Invalid mail</p>
                  <div className="input-group">
                      <div className="input-group-prepend"></div>
                      <input id="inputMail" className="form-control" value={this.props.mail} onChange={e => this.props.changeMail(document.getElementById("inputMail").value) } type="text" />
                      <div className="input-group-append">
                      <button className="btn btn-primary" type="button" onClick={(e) => {this.handleCopy(e)}}>COPY</button>
                      <button className="btn btn-primary" type="button" onClick={() => {this.props.renewMail();}}  style={{backgroundColor: "#4136ba"}}>NEW</button></div>
                  </div>
                  <p className="text-center">Forget about spam, advertising mailings, hacking and attacking robots. <br />Keep your real mailbox clean and secure. Temp Mail provides temporary, <br />secure, anonymous, free, disposable email address</p>
              </div>
              <div className="col-md-4"></div>
          </div>
        );
    }
}
export default Generator;
