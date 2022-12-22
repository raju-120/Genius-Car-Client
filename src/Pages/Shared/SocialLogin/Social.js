import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { setAuthToken } from '../../../Utilities/auth';

const Social = () => {

    const {googleSignIn} = useContext(AuthContext);

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result => {
            const user = result.user;
            console.log(user);

            setAuthToken(user);
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <p className='text-center'>Social Login</p>
            <p className='text-center'>
                <button onClick={handleGoogleSignIn} className='btn btn-ghost'>Google</button>
            </p>
        </div>
    );
};

export default Social;