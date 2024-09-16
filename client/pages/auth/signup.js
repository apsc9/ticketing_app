import { useState } from "react";
import axios from "axios";

const signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async e => {
    e.preventDefault();

    try {
        const response = await axios.post('/api/users/signup' , {
            email,
            password
        });

        console.log(response.data);
    }   catch (err) {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
    }
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
            {errors.find(err => err.field === 'email') && (
                <div className="text-danger">
                {errors.find(err => err.field === 'email').message}
                </div>
            )}
        </div>
        <div className="form-group">
            <label>Password</label>
            <input className="form-control" 
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}/>
            {errors.find(err => err.field === 'password') && (
                <div className="text-danger">
                {errors.find(err => err.field === 'password').message}
                </div>
            )}
        </div>
        {errors.some(err => !err.field) && (
            <div className="alert alert-danger">
                <h4>Oh ...</h4>
                <ul className="my-0">
                {errors
                    .filter(err => !err.field)
                    .map(err => (
                    <li key={err.message}>{err.message}</li>
                    ))}
                </ul>
            </div>
        )}

        <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default signup;