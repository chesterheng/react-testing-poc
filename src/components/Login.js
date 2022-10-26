import React from "react";

const Login = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    onSubmit({
      username: username.value,
      password: password.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username-field">Username</label>
        <input id="username-field" name="username" type="text" />
      </div>
      <div>
        <label htmlFor="password-field">Password</label>
        <input id="password-field" name="password" type="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export { Login };
