import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div> 
        <p class = "text-4xl">
          Hello, my name is Juan Barrera
        </p>
        <h1 class = "text-8xl">
          Software developer
        </h1>
      </div>
    </>
  )
}

export default App
