import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';
import {Button} from 'reactstrap';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      name:'',
      email:'',
      message:''
    }
    this.onName=this.onName.bind(this);
    this.onMail=this.onMail.bind(this);
    this.onMsg=this.onMsg.bind(this);
  }
  onName(a){
    this.setState({name: a.target.value})
  }
  onMail(b){
    this.setState({email: b.target.value})
  }
  onMsg(c){
    this.setState({message: c.target.value})
  }
  onClick1 = async () => {
    var formBody = [];
    formBody.push("name =" + encodeURIComponent(this.state.name));
    formBody.push("email =" + encodeURIComponent(this.state.email));
    formBody.push("content =" + encodeURIComponent(this.state.message));
    formBody = formBody.join("&")
    console.log("Data from UI:",formBody)
    fetch('http://192.168.0.102:8082/SendMail',{
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept-Charset': 'utf-8'
                },
                body: formBody
    })
    .then((response) => response.json())
    .then((status) => {
      console.log("Data from UI:",status)
      if (status.status === 200) { 
        swal("Enquiry Sent","Will Get Back To You Shortly !!!!", "success") 
      }
      else if(status.status === 400){
        swal("Bad Request", "Cannot Establish Connection", "error")
      }        
    })
    .catch((err) => {
        console.log(err);
    });
  } 
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h2>Contact Form </h2>
          <label>Name</label><br/>
          <input type="text" value={this.state.name} onChange={this.onName}/><br/>
          <label>Email</label><br/>
          <input type="text" value={this.state.email} onChange={this.onMail}/><br/>
          <label>Message</label><br/>
          <input type="textarea" value={this.state.message} onChange={this.onMsg}/><br/>
          <Button onClick={this.onClick1}>Submit</Button>
        </header>
      </div>
    );
  }
}

export default App;
