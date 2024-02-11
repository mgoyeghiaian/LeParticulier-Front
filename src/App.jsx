import './App.css'
import Navbar from './Components/Navbar'
import SharedRoutes from './SharedRoutes'
import ScrollToTop from './Components/UpScroller/UpScroller'
import Footer from './Components/Footer'
import ScrollingHead from './Components/ScrollingHead'
function App() {

  return (
    <>
      <ScrollingHead />
      <Navbar />
      <SharedRoutes />
      <ScrollToTop />
      <Footer />
    </>
  )
}

export default App
