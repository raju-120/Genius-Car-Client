import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user} = useContext(AuthContext);
    const [orders, setOrder] = useState([]);

    
    useEffect( () =>{
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setOrder(data))
    } ,[user?.email]);


    return (
        <div>
            <h2 className="text-5xl">You have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map( order => <OrderRow
                        key={order._id}
                        order= {order}></OrderRow>)
                    }
                </tbody>
                    
               </table>
            </div>
        </div>
    );
};

export default Orders;