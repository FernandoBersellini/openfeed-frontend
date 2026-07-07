import './App.css'
import Auth from './components/Auth'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/useAuth'
import { ThemeProvider } from './context/ThemeContext'

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900'>
        <Auth />
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900'>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
