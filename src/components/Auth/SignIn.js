import React from "react";
import Login from "./Login";
import firebase from "firebase/app";
import { firebaseApp } from "../../base";

class SignIn extends React.Component {
  state = {
    user: "",
  };

  authHandler = async authData => {
    const {email} = authData;
    this.setState({
        user: email
    })
  };

  authenticate = () => {
    const authProvider = new firebase.auth["GithubAuthProvider"]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  render() {
    if (!this.state.user) {
      return <Login authenticate={this.authenticate} />;
    }
    return this.props.children;
  }
}

export default SignIn;
