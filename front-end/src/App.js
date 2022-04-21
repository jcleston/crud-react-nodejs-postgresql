import logo from './logo.svg';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
// import { get } from '../../back-end/src/todos.routes';

function App() {

  //Criando um componente
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button
                onClick={() => modifiStatusTodo(todo)}
                className='checkbox'
                style={{ backgroundColor: todo.status ? '#A879E6' : 'white' }}></button>
              <p>{todo.id} - {todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={'#64697b'}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={'#64697b'}></AiOutlineDelete>
              </button>
            </div>
          )
        })}
      </div>
    )
  }


  async function handleWithNewButton() {
    setInputVisility(!inputVisbility)
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo)
    setInputVisility(true)
  }

  async function getTodos() {
    const res = await axios.get('http://localhost:3333/todos')
    setTodos(res.data)
  }

  async function editTodo() {
    const res = await axios.put('http://localhost:3333/todos', {
      id: selectedTodo.id,
      name: inputValue
    })
    setSelectedTodo()
    setInputVisility(false)
    getTodos()
    setInputValue('')
  }

  async function createTodo() {
    const res = await axios.post('http://localhost:3333/todos', { name: inputValue })
    getTodos()
    setInputVisility(!inputVisbility)
    setInputValue('')
  }

  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`)
    getTodos()
  }

  async function modifiStatusTodo(todo) {
    const res = await axios.put('http://localhost:3333/todos', {
      id: todo.id,
      status: !todo.status
    })
    getTodos()
  }

  //Criando os estados
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputVisbility, setInputVisility] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState()

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="App">
      <header className="container">

        <div className='header'>
          <h1>Crud</h1>
        </div>

        {/* Invocando o compnente */}
        <Todos todos={todos}></Todos>

        <input
          value={inputValue}
          style={{ display: inputVisbility ? 'block' : 'none' }}
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
          className='inputName'
        ></input>
        <button onClick={inputVisbility ? selectedTodo ? editTodo : createTodo : handleWithNewButton} className='newTaskButton'>
          {inputVisbility ? 'Cadastrar' : '+ Novo registro'}
        </button>
      </header>
    </div>
  );
}

export default App;
