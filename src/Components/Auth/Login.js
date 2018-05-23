import React, { Component } from 'react';
import fire from '../../config';
import firebase from 'firebase'

class Login extends Component{
    constructor(props){
        super(props);
    
        this.loginUser = this.loginUser.bind(this);
        this.signUpUser = this.signUpUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.googleAuth = this.googleAuth.bind(this);
        this.state = {
            email: '',
            password: '',
            displayName: '',
        }
    }

    googleAuth(e){
    var provider = new firebase.auth.GoogleAuthProvider();        
    e.preventDefault();
    fire.auth().signInWithPopup(provider).then(function(result) {
        });
    }
    
    loginUser(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        });
    }

    signUpUser(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
        })
    }


     handleChange(e){
         this.setState({ [e.target.name]: e.target.value })
     }

    render(){
        return (
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" placeholder="Email address" required />
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" placeholder="Password" required />
                    <div className="button-group">
                        <button onClick={this.loginUser} className="btn btn-lg btn-primary" type="submit">Log In</button>
                        <button onClick={this.signUpUser} className="btn btn-lg btn-success" type="submit">Sign Up</button>
                    </div>
                     <div className="google-sign">
                        <button onClick={this.googleAuth} className="btn btn-lg btn-danger" type="submit">Sign In with Google</button>
                    </div>
            </form>
        )
     }
}

export default Login;