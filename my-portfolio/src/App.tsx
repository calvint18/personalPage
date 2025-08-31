import './App.css'
import AboutMe from './components/AboutMe'

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
      </main>
    </>
  )
}

export default App
