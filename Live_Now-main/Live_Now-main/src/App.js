import './App.css';
import Header from './components/Header/Header';
import Featured from "./components/Featured/Featured";
import LatestArticles from "./components/LatestArticles/LatestArticles";
function App() {
  return (
    <div className="App">
      <Header/>
      <Featured/>
      <LatestArticles/>
    </div>
  );
}

export default App;
