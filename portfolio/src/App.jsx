import './App.css'
import Submenu from './components/submenu'
import HomeSc from './screens/homesc'

function App() {
  return (
    <>
      <Submenu/>
      <section id="home">
        <HomeSc/>
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
