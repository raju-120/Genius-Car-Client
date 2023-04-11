import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useTitle from '../../hooks/useTitle';


const CheckOut = () => {
    const {_id, img, title , price} = useLoaderData();
    const {user} = useContext(AuthContext);
    useTitle('Checkout');
    
    const handlePlaceOrder= event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || "Unregistered";
        const address = form.address.value;
        //const currency =  form.currency.value;
        //const postcode = form.postcode.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email, 
            phone,
            address
        }

        /* if(phone.length > 11){
            alert('Phone number should be 11 Character');
        }
        else{
        } */
        fetch('https://genius-car-server-red-one.vercel.app/orders', {
            method: 'POST',
            headers:{
                'content-type' : 'application/json',
                authorization: `Bearer ${localStorage.getItem( 'geniusToken' )}`
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
             if(data.acknowledge){
                alert('Place your order successfully');
                form.reset();
            } 
            window.location.replace(data.url)
        })
        .catch(er => console.error(er));
    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder} className='mb-5 flex item-center justify-between'>
                <div>
                    <h2 className="text-4xl text-center mb-5 text-orange-500">Your are about to order: {title}</h2>
                    <h4 className="text-3xl text-center p-2 text-gray-500">Price: ${price}</h4>
                    <img src={img} alt="" />
                </div>

                <div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>

                        <input 
                            name="firstName" 
                            type="text" 
                            placeholder="First Name" 
                            className="input input-bordered w-full" 
                            required
                        />
                        <input 
                            name="lastName" 
                            type="text" 
                            placeholder="Last Name" 
                            className="input input-bordered w-full" 
                            required
                        />
                        <input 
                            name="phone" 
                            type="text" 
                            placeholder="Your Phone" 
                            className="input input-bordered w-full" 
                            required
                        />
                        <input 
                            name="email" 
                            type="text" 
                            placeholder="Your Email" 
                            defaultValue={user?.email} 
                            className="input input-bordered w-full" 
                            readOnly
                            />
                       
                       {/*  <select name='currency' className="select select-bordered  max-w-xs mb-2">
                            <option defaultValue={'USD'} disabled selected>
                                Currency
                            </option>
                            <option value={'BDT'}>BDT</option>
                            <option value={'USD'}>USD</option>
                        </select> */}

                        {/* <input 
                            name="postcode" 
                            type="text" 
                            placeholder="Your PostCode" 
                            className="input input-bordered w-full" 
                            
                            /> */}
                        </div>



                        <textarea 
                        name="address" 
                        className="textarea textarea-accent mb-5 w-full" 
                        style={{height: '200px'}} 
                        placeholder="Your Message" 
                        required
                        >
                        </textarea>

                        <input className='btn w-full' type="submit" value="Pay" />
                </div>
            </form>
        </div>
    );
};

export default CheckOut;