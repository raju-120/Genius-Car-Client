import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';
import useTitle from '../../hooks/useTitle';

const Orders = () => {
    const { user, logOut} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    useTitle('Order');

    
    useEffect( () =>{
        fetch(`https://genius-car-server-red-one.vercel.app/orders?email=${user?.email}` ,{
            headers: {
                authorization: `Bearer ${localStorage.getItem( 'geniusToken' )}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
                return logOut();
            }
            return res.json();
        })
        .then(data => {
            //console.log('inside received' , data);
            setOrders(data)
        })
    } ,[user?.email, logOut]);

    const handleDelete = id =>{
        const proceed = window.confirm("Are You sure, you want to cancel this order?");
        if(proceed){
            fetch(`https://genius-car-server-red-one.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                        authorization: `Bearer ${localStorage.getItem( 'geniusToken' )}`
                    }
                
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    window.alert("Deleted Successfully");
                    const remaining = orders.filter(odr => odr._id !== id);
                    setOrders(remaining);
                }
            })
        }
    }
    const handleStatusUpdate = id => {
        fetch(`https://genius-car-server-red-one.vercel.app/orders/${id}`, {
            method: 'PATCH', 
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem( 'geniusToken' )}`
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0 ){
                const remaining = orders.filter(odr => odr._id !== id);
                const approving = orders.find(odr => odr._id === id);
                approving.status = "Approved";

                const newOrders = [approving, ...remaining];
                setOrders(newOrders);

            }
        })
    }


    return (
        <div>
            <h2 className="text-5xl">You have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map( order => <OrderRow
                        key={order._id}
                        handleDelete={handleDelete}
                        order= {order}
                        handleStatusUpdate={handleStatusUpdate}
                        ></OrderRow>)
                    }
                </tbody>
                    
               </table>
            </div>
        </div>
    );
};

export default Orders;