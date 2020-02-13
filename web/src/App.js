import React, { useState, useEffect } from 'react';
import DevItem from './components/DevItem/DevItem'
import DevForm from './components/DevForm/DevForm'
import api from './services/api'
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
// Component = função que retorna algum bloco isolado de html, css e js que não interfere no restante
// da aplicação. Deve ter um por arquivo

// Properties = Informações que o componente pai passa para o componente filho. "Atributos dos componentes"

// State = Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map((dev) => 
            <DevItem key={dev._id} dev={dev} />
          )}
        </ul>
      </main>
    </div>
  )
}

export default App;
