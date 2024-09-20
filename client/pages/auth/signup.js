import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

const signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [errors, setErrors] = useState([]);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
        email, password
    },
    onSuccess: () =>  Router.push('/')
  });

  const onSubmit = async e => {
    e.preventDefault();
    
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
        <h1>SignUp</h1>
        <div className="form-group">
            <label>Email Address</label>
            <input className="form-control" 
                value={email} 
                // type="email" 
                onChange={e => setEmail(e.target.value)}
            />
            {/* Make changes accordingly to display the below line 
            As of now errors is a JSX object from useRequest which needs to be changed  */}
            {/* {errors && errors.find(err => err.field === 'email') && (
                <div className="text-danger">
                {errors.find(err => err.field === 'email').message}
                </div>
            )} */}
        </div>
        <div className="form-group">
            <label>Password</label>
            <input className="form-control" 
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}/>
            {/* {errors && errors.find(err => err.field === 'password') && (
                <div className="text-danger">
                {errors.find(err => err.field === 'password').message}
                </div>
            )} */}
        </div>
        {errors}
        <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default signup;