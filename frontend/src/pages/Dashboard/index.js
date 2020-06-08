import React, {useEffect, useState, useMemo} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import socketio from 'socket.io-client'; 

import './styles.css';


export default function Dashboard(){
    const [spots, setSpots] = useState([]);
    const [requests, setResquests] = useState([]);

    const user_id = localStorage.getItem('user');

    const socket = useMemo( () => socketio('http://192.168.0.128:3030', {
        query: { user_id}, 
    }), [user_id] );
        
    useEffect( () => {
        socket.on('booking_request', data => {
            setResquests([...requests, data]);
        })
    }, [requests, socket]);

    useEffect( () => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard',{
                headers: {user_id}
            });
            console.log(response.data);
            setSpots(response.data);
        }
        loadSpots();
    }, [] );

    async function handleAccept(id){
        console.log(id);
        await api.post(`/bookings/${id}/approvals`);
        setResquests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id){
        await api.post(`/bookings/${id}/rejects`);
        setResquests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map( request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para o dia <strong>{request.date}</strong>
                        </p>
                         <button className="accept btn" onClick={()=> handleAccept(request._id)}>ACEITAR</button>
                         <button className="reject btn" onClick={()=> handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>
            <ul className="spot-list">
                {spots.map( spot => (
                        <li key={spot._id}>
                            <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}}/>
                            <strong>{spot.company}</strong>
                            <span>{spot.price ? `R$ ${spot.price}/dia `: `GRATUITO`} </span>
                        </li>
                ))}
            </ul>
            <Link to="new">
                    <button className="btn">Novo Spot</button>
            </Link>
            <Link to="/">
                    <button className="btn exit">Sair</button>
            </Link>
        </>
    )
}