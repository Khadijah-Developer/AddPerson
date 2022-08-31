import logo from './logo.svg';
import './App.css';
import Main from './views/Main';
import Detail from './views/Detail';
import Update from './views/Update';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/people/" element={<Main />} />
          <Route exact path="people/:id" element={<Detail />} />
          <Route exact path="/people/:id/edit" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
