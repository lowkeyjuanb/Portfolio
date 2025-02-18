import './App.css'
import Submenu from './components/submenu'
import HomeSc from './screens/homesc'
import AboutSc from './screens/about'
import SkillsSc from './screens/skills'
import PortfolioSc from './screens/portfolio'
import ContactSc from './screens/contact'

function App() {
  return (
    <>
      <div className='bg-gray-100 shadow-xl'>
        <Submenu/>
        <section id="home">
          <HomeSc/>
        </section>
        <section id="about">
          <AboutSc/>
        </section>
        <section id="skills">
          <SkillsSc/>
        </section>
        <section id="portfolio">
          <PortfolioSc/>
        </section>
        <section id="contact">
          <ContactSc/>
        </section>
      </div>

    </>
  )
}

export default App
