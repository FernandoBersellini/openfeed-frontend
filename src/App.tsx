import './App.css'
import Auth from './components/Auth'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className='flex flex-col min-h-screen'>
        <Auth />
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
