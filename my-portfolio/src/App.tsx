import './App.css'
import AboutMe from './components/AboutMe'
import Education from './components/Education'
import Experience from './components/Experience'

import Header from './components/Header'
import Intro from './components/Intro'
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
      </main>
    </>
  )
}

export default App
