import React, { Component } from 'react';
import fire from './config';
import Login from './Components/Auth/Login';
import Home from './Components/Auth/Home';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user})
      }else{
        this.setState({user: null})
      }
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.user ? (<Home user={this.state.user}/>)  : (<Login />)}
      </div>
    );
  }
}

export default App;
