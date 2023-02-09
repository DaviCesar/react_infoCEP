import { useState } from 'react';
import './styles.css';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum CEP")
      return
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
    }
    catch {
      alert("Erro ao buscar CEP")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>
      {cep ?
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          {cep.complemento ?
            <span>Complemento:   {cep.complemento}</span>
            : null}
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
        : null}
    </div>
  )
}

export default App
