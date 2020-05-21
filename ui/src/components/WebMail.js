import React, { Component } from 'react';
import { ReactComponent as Loading } from './Loading.svg';
import Modal from './Modal';

class WebMail extends Component {
    componentDidMount(){
      setInterval(()=>{ this.props.update() },60000);
    }
    constructor(props){
      super(props);
      this.state={ sender : "" , subject: "" , content:"test"};
    }
    handleShow(mail){
      this.setState({ sender : mail.sender , subject: mail.subject , content:mail.content});
      document.getElementById("myModal").style.display="block";
    }
    deleteMail(mail){
      fetch("http://"+window.location.hostname+":8000/mail/deleteMail/"+mail.reciever+"/"+mail.id).then((response)=> response.json()).then((data)=>{ this.domains=data})
      this.props.update();
    }
    render(){
        let mails=(this.props.mails.length)?this.props.mails.map( (mail,index) => 
                                                      (<tr key={index}>
                                                        <td>{mail.sender}</td>
                                                        <td>{mail.subject}</td>
                                                        <td><button onClick={() => this.handleShow(mail) } className="btn btn-info" type="button" style={{padding:"0px"}} >View</button>
                                                        <button onClick={() => this.deleteMail(mail) } className="btn btn-info" type="button" style={{padding:"0px"}} >Delete</button>
                                                        </td>
                                                      </tr>) )
                                                      :<tr><td colSpan='3'><div><center><Loading /><p>Your inbox is empty<br />Waiting for incoming emails</p></center></div></td></tr>;

        return (
        <div>
          <div>
                <Modal content={this.state.content} sender={this.state.sender} subject={this.state.subject} />
                 <div className="container">
                     <div className="row">
                         <div className="col-md-4"></div>
                         <div className="col-md-4 m-auto">
                             <div className="d-flex justify-content-center align-items-center m-auto">
                              <button className="btn btn-primary" type="button" onClick={this.props.update}>Refresh</button>
                              </div>
                         </div>
                         <div className="col-md-4"></div>
                     </div>
                 </div>
             </div>
             <br />
             <div>
                 <div className="container">
                     <div className="row">
                         <div className="col-md-12">
                             <div></div>
                         </div>
                     </div>
                     <div className="row">
                         <div className="col-md-12">
                             <div className="table-responsive">
                                 <table className="table">
                                     <thead>
                                         <tr>
                                             <th>Sender</th>
                                             <th>Subject</th>
                                             <th>Action</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                          { 

                                            mails

                                          }
                                          
                        
                                     </tbody>
                                 </table>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
          </div>
        );
    }
}
export default WebMail;
