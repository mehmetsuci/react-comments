import React from 'react'

// functional stateless componenets
const Comment = props => (
  <div className="card">
    <p className="card-header">
      {props.comment.comment} <br/>
      <small>postador por: <br />
      <img src={props.comment.user.photo} alt={props.comment.user.name} className="rounded-circle" width="20px" /> 
      {props.comment.user.name}</small>
    </p>
  </div>
);
export default Comment

