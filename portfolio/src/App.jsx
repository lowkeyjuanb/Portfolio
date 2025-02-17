import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Submenu from './components/submenu'

function App() {
  return (
    <>
      <Submenu/>
      <section id="home">
        <div> 
          <p class = "text-4xl">
            Hello, my name is Juan Barrera
          </p>
          <h1 class = "text-8xl">
            Software developer
          </h1>
        </div>
      </section>
      <section id="about">
        <h1>About me</h1>
      </section>
      <section id="skills">
        <h1>Skills</h1>
      </section>
      <section id="portfolio">
        <h1>Portfolio</h1>
      </section>
      <section id="contact">
        <h1>Contact</h1>
      </section>

    </>
  )
}

export default App
