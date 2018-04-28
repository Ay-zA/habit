import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import LoginMutation from '<client>/gql/LoginMutation.gql';
import { func } from 'prop-types';

@graphql(LoginMutation, { name: 'loginMutation' })
class Login extends Component {
  static propTypes = {
    loginMutation: func.isRequired,
  };
  state = {
    email: '',
    password: '',
  };

  handleFieldChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState(state => ({
      [name]: value,
    }));
  };

  handleLogin = async () => {
    const { email, password } = this.state;

    const authPayload = await this.props.loginMutation({
      variables: {
        email,
        password,
      },
    });
    alert(authPayload.data.login.token);
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
        <button onClick={this.handleLogin}>Login</button>
        <Link to="/signup">New User?</Link>
      </div>
    );
  }
}

export default Login;
