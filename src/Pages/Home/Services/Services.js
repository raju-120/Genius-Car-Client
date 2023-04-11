import React, { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

    const [services, setServices] = useState([]);
    const [isAsc, setISASsc] = useState(true);
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    useEffect( () =>{
        fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
        .then(res => res.json())
        .then(data => setServices(data))
    } , [isAsc, search])

    const handleSearch =  () =>{
        setSearch(searchRef.current.value);
    }

    return (
        <div>
            <div className='text-center mb-5'>
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <h2 className="my-5 text-5xl font-semibold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
                <input ref={searchRef} type="text" className="input input-bordered input-primary input-sm w-full max-w-xs"/> 
                <button className='btn' onClick={handleSearch}>Search</button>
                <button className='btn btn-ghost' onClick={() => setISASsc(!isAsc)}>{ isAsc ? 'desc' : 'asc' }</button>
            </div>

            <div className='mb-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    services.map( service => <ServiceCard
                    key={service._id}
                    service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;