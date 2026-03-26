import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Concept from './components/Concept'
import Pillars from './components/Pillars'
import Philosophy from './components/Philosophy'
import Exclusivity from './components/Exclusivity'
import Members from './components/Members'
import SignupForm from './components/SignupForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Concept />
        <Pillars />
        <Philosophy />
        <Exclusivity />
        <Members />
        <SignupForm />
      </main>
      <Footer />
    </>
  )
}
