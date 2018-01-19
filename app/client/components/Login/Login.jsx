import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import SigninMutation from '-/gql/SigninMutation.gql';
import { func } from 'prop-types';

@graphql(SigninMutation, { name: 'signinMutation' })
class Login extends Component {
  static propTypes = {
    signinMutation: func().isRequired
  };
  state = {
    email: '',
    password: ''
  };

  handleFieldChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState(state => ({
      [name]: value
    }));
  };

  handleSignin = async () => {
    const { email, password } = this.state;

    const authPayload = await this.props.signinMutation({
      variables: {
        email,
        password
      }
    });
    alert(authPayload.data.signin.token);
  };

  render() {
    return (
      <div>
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleFieldChange}
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleFieldChange}
        />
        <button onClick={this.handleSignin}>Signin</button>
        <Link to="/signup">New User?</Link>
      </div>
    );
  }
}

export default Login;
