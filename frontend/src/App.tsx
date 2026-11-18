import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Modal from './components/Modal';

function App() {
  return (
    <div className="min-h-screen bg-slate-950" data-theme={"dracula"}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Modal />
    </div>
  )
}

export default App
