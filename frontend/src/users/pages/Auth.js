import React, { useState, useContext } from 'react'

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hooks';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';


import './Auth.css';

export const Auth = () => {

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, InputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  },
    false
  );

  const switchModeHandler = (event) => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            type="text"
            label="Your Name"
            element="input"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter your name"
            onInput={InputHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          label="Email"
          element="input"
          validators={[VALIDATOR_EMAIL]}
          errorText="Please enter a valid email address"
          onInput={InputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          element="input"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password (at least 6 characters)"
          onInput={InputHandler}
        />
        <Button
          type="submit" disabled={!formState.isValid}
        >
          {isLoginMode ? 'Login' : 'Signup'}
        </Button>
      </form>
      <Button
        inverse onClick={switchModeHandler}
      >Switch to {!isLoginMode ? 'Login' : 'Signup'} mode</Button>
    </Card>
  )
}
