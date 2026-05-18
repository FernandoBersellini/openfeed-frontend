import './App.css'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
