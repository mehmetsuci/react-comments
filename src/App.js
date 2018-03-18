import React, { Component } from 'react'
import 'bootstrap-css-only'

import NewComment from './NewComment'
import Comments from "./Comments";
import base from "./base";



class App extends Component {
  constructor(props) {
    super(props);

    this.postNewComment = this.postNewComment.bind(this);

    this.state = {
      comments: {},
      isLoggedIn: false,
      user: {}
    };

    this.refComments = base.syncState("comments", {
      context: this,
      state: "comments"
    });

    this.props.auth.onAuthStateChanged(user => {
      console.log(user);
      
      if (user) {
        this.setState({ isLoggedIn: true, user });
      } else {
        this.setState({ isLoggedIn: false, user: {} });
      }
    }); 
  }
  postNewComment(comment) {
    comment.user = {
      uid: this.state.user.uid,
      name: this.state.user.displayName,
      photo: this.state.user.photoURL
    }
    const comments = { ...this.state.comments };
    const timestamp = Date.now();
    comments[`comm-${timestamp}`] = comment;

    this.setState({
      comments: comments
    });
  }
  auth(provider) {
    this.props.auth.signInWithPopup(this.props.providers[provider]);
  }
  render() {
    return <div className="container">
        <div className="row">
          <div className="col">
            <h2>Sistema de comentários</h2>

            {this.state.isLoggedIn && 
              <div>
                <div className="user">
                  <img src={this.state.user.photoURL} alt={this.state.user.displayName} className="rounded-circle" width="50px" />
                  {this.state.user.displayName}
                  <button className="btn btn-outline-danger btn-sm" onClick={() => this.props.auth.signOut()}>x</button>
                </div>
                <NewComment postNewComment={this.postNewComment} />
                <Comments comments={this.state.comments} />
              </div>
            }

            {!this.state.isLoggedIn && 
              <div className="alert alert-info text-center">
                <button onClick={() => this.auth("facebook")} className="btn btn-sm btn-outline-info">
                  Entre com o Facebook para comentar
                </button>
              </div>
            }
          </div>
        </div>
      </div>
  }
}

export default App;
