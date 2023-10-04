import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateAppointment from './pages/CreateAppointment';
import Home from './pages/Home';
import ViewAppointments from './pages/ViewAppointments';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/create-appointment" element={<CreateAppointment />} />
                <Route exact path="/view-appointments" element={<ViewAppointments />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
