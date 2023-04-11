import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/images/login/login.svg';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Social from '../Shared/SocialLogin/Social';
import useTitle from '../../hooks/useTitle';



const Login = () => {

    const {userLogin} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    useTitle('Login');

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password =  form.password.value;

        userLogin(email, password)
            .then(result => {
                const user = result.user;
                
                const currentUser = {
                    email: user.email
                }
                console.log(currentUser);
                
                //get jwt token
                fetch('https://genius-car-server-red-one.vercel.app/jwt', {
                    method: 'POST',
                    headers:{
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(currentUser),
                })
                .then(res => res.json())
                .then(data =>{
                    console.log(data);
                    //local storage is easiest but not the best place place to store it
                    localStorage.setItem('geniusToken', data.token) 
                    navigate(from, {replace: true});
                });

            })
            .catch(error => console.log(error));


    }

    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required/>
                                <label className="label">
                                    <Link to=''  className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Login" />
                            </div>
                        </form>
                        <p className='text-center'>New to genius car? <Link className='text-orange-600 font-bold' to='/signup'>SignUp</Link> </p>
                        <Social></Social>
                </div>
            </div>
        </div>
    );
};

export default Login;