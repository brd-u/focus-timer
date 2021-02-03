import './App.css';
import Timer from './app/components/Timer.js'
import Footer from './app/components/Footer.js'
import Header from './app/components/Header.js'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header/>
      <Timer/>
      <Footer/>
    </div>
  );
}

export default App;
