import React, { useContext } from 'react';
import { Link,/*  useLocation, useNavigate  */} from 'react-router-dom';
import login from '../../assets/images/login/login.svg';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { setAuthToken } from '../../Utilities/auth';
import Social from '../Shared/SocialLogin/Social';
import useTitle from '../../hooks/useTitle';

const SignUp = () => {

    const {createUser} = useContext(AuthContext);
    useTitle('SignUp');
/*     const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
 */
    const handleSignUp = event =>{
        event.preventDefault();
        const form = event.target;
        //const name = form.name.value; 
        const email= form.email.value;
        const password = form.password.value;

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setAuthToken(user);
        })
        .then(err => console.error(err))

        
    }
    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                <h1 className="text-5xl text-center font-bold">SignUp</h1>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Sign Up" />
                        </div>
                    </form>
                    <p className='text-center'>Already have an account? Please <Link className='text-orange-600 font-bold' to='/login'>Login</Link> </p>
                    <Social></Social>
                </div>
            </div>
        </div>
    );
};

export default SignUp;