import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Orders = () => {
    const {user} = useContext(AuthContext);
    const [order, setOrder] = useState({});

    
    useEffect( () =>{
        fetch(`http://localhost:5000/orders?email=${user.email}`)
        .then(res => res.json())
        .then(data => setOrder(data))
    } ,[user?.email])


    return (
        <div>
            <h2 className="text-5xl">You have {order.length} orders</h2>
        </div>
    );
};

export default Orders;