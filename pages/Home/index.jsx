// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './style.css'
import api from '../../src/services/api'
import { useEffect,useState, useRef } from 'react'



function Home() {
  // const [count, setCount] = useState(0)


  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFrom = await api.get('/usuarios')

     setUsers(usersFrom.data)
  }

  async function deletetUsers(id) {
    await api.delete(`/usuarios/${id}`)


     getUsers() 
  }

    async function createtUsers() {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value ,
        email: inputEmail.current.value 
      })

      getUsers()
  }



  useEffect (() => {
       getUsers()

    },[])


  return (
    <div className='container'>
      <form action="">
        <h1>Cadastro</h1>
        <input name='nome' type="text" placeholder='Nome:' ref={inputName}/>
        <input name='idade' type="number" placeholder='Idade' ref={inputAge}/>
        <input name='email' type="email" placeholder='E-mail' ref={inputEmail}/>
        <button type='button' onClick={createtUsers} >Salvar</button>
      </form>
      {users.map(user => (
        <div key={user.id}>
          <p>Nome: {user.name}</p>
          <p>Idade: {user.age}</p>
          <p>Email: {user.email}</p>
          <button onClick={ () => deletetUsers(user.id)}>
            <p>X</p>
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home
