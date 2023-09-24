import './styles/global.scss';
import Main from "./components/Main/Main.jsx";
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return(
    <main>
      <Navbar />
      <Main />
    </main>
  );
};

export default App
