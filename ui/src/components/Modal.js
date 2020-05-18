import React, { Component } from 'react';
import "./Modal.css"
class Modal extends Component {
    close(){
         document.getElementById("myModal").style.display="none";
    }
    render(){

        return(
            <div id="myModal" onClick={this.close} className="modal">
   
              <div className="modal-content">
                <span className="close" onClick={this.close} >&times;</span>
                <p>From : {this.props.sender}</p>
                <p>Subject : {this.props.subject}</p>
                <iframe title="mail" id="mailFrame" srcDoc={atob(this.props.content)}></iframe>
              </div>
            
            </div>);
            }
}
export default Modal;
