import './App.css';
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import {Route, Routes} from "react-router-dom";
import Add from "./pages/Add/Add.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import List from "./pages/List/List.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Reservation from './pages/Reservation/Reservation.jsx';
import AdminDashboard from "./pages/Status/AdminDashboard.jsx";

function App() {
  const url = "http://localhost:5000";

  return (
    <div className="app-container">
      <ToastContainer />
      <Navbar />
      <div className="app-main">
        <Sidebar />
        <div className="app-content">
          <Routes>
              <Route path="/" element={<AdminDashboard url={url}/>}/>
              <Route path="/add" element={<Add url={url}/>}/>
              <Route path="/list" element={<List url={url}/>}/>
              <Route path="/orders" element={<Orders url={url}/>}/>
              <Route path="/reservation" element={<Reservation url={url}/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
