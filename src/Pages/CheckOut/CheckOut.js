import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';


const CheckOut = () => {
    const {_id, title , price} = useLoaderData();
    const {user} = useContext(AuthContext);
    
    const handlePlaceOrder= event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || "Unregistered";
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email, 
            phone,
            message
        }

        /* if(phone.length > 11){
            alert('Phone number should be 11 Character');
        }
        else{
        } */
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledge){
                window.form.reset();
                window.alert('Order Place Successfully');
            }
        })
        .catch(er => console.error(er));
    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder} className='mb-5'>
                <h2 className="text-4xl text-center mb-5 text-orange-500">Your are about to order: {title}</h2>
                <h4 className="text-3xl text-center p-2 text-gray-500">Price: ${price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                    <input name="firstName" type="text" placeholder="First Name" className="input input-bordered w-full" required/>
                    <input name="lastName" type="text" placeholder="Last Name" className="input input-bordered w-full" required/>
                    <input name="phone" type="text" placeholder="Your Phone" className="input input-bordered w-full" required/>
                    <input name="email" type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full" readOnly/>
                </div>
                <textarea name="message" className="textarea textarea-accent mb-5 w-full" style={{height: '200px'}} placeholder="Your Message" required></textarea>

                <input className='btn' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default CheckOut;