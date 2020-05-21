import React , { Component } from 'react';
import Generator from './Generator';
import WebMail from './WebMail';

class Home extends Component {

    componentDidMount(){
       fetch("http://"+window.location.hostname+":8000/mail/getDomains").then((response)=> response.json()).then((data)=>{ this.domains=data})
    }
    constructor(props){
       super(props)
       this.state={ mail : "" , mails : [] }  
       this.domains=[]
    }
    updateMails(){
        const mail=this.state.mail;
        fetch("http://"+window.location.hostname+":8000/mail/getMails/"+mail)
           .then((response) => response.json())
           .then((data) => {
                            let state=this.state;
                            state.mails=data;
                            this.setState(state);
                        
                            });
    }

    handleChangeMannually(e){
        let mailIsValid = false;
        this.domains
            .forEach((domain)=>{                       
                     if(e.substring(e.length-domain.length-1)==='@'+domain){
                         mailIsValid = true;
                     }
                     });
        let errorMail=document.getElementById("mailInvalid");
        const state=this.state;
        if (!mailIsValid){
            errorMail.classList.remove("validityOfMail");
            state.mail=e;
            this.setState(state);
        }
        else{

            errorMail.classList.add("validityOfMail");  
            state.mail=e;
            this.setState(state, () => this.updateMails()); 
        }                  
        
        
        
     }
    handleClickChangeMail(){
       fetch("http://"+window.location.hostname+":8000/mail/getAdress")
           .then((response) => response.json())
           .then((data) => {
                            const state=this.state;
                            state.mail=data.mail;
                            this.setState(state,() => this.updateMails() );
                            });
    }

    render(){
        
        return (
            <div>
                <Generator mail={this.state.mail} changeMail={(e) => this.handleChangeMannually(e)} renewMail={() => this.handleClickChangeMail()}/>  
                <WebMail mails={this.state.mails}  update={() => this.updateMails() }/>
            </div>
        );
    }
}
export default Home;
