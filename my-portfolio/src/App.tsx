import './App.css'
import AboutMe from './components/AboutMe'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'

import Header from './components/Header'
import Intro from './components/Intro'
import Projects from './components/Projects'
import Skills from './components/Skills'

function App() {


  return (
    <>
      <Header />
      <main className="pt-16">
        <Intro />
        <AboutMe />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
