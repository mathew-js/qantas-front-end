import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './layout/Layout';
import { AirportList } from './pages/airport-list/AirportList';
import { AirportDetails } from './pages/airport-details/AirportDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AirportList />} />
          <Route path=":id" element={<AirportDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
