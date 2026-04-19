import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./app/login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;