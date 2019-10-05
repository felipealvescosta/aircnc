import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({history}) {

  const [email, setEmail] = useState('');

  async function handleSubmit(event){
    event.preventDefault(); 
    const response = await api.post('/sessions', { email } );
    const { _id } = response.data;

    console.log( _id );
    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

    return (
    <>
      <p>
        Ofereça <strong>Spots</strong> para programadores e encontre talentos!
      </p>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email"> E-mail * </label>
          <input 
            type="email"
            id="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
            />
            <button type="submit" className="btn">Entrar</button>
      </form> 
    </>
    )
}