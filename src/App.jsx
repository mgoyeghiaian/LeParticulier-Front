import './App.css'
import Navbar from './Components/Navbar'
import SharedRoutes from './SharedRoutes'
import ScrollToTop from './Components/UpScroller/UpScroller'
import Footer from './Components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <SharedRoutes />
      <ScrollToTop />
      <Footer />
    </>
  )
}

export default App
