import { Outlet } from 'react-router-dom';
import QantasLogo from '../assets/qantas.png';

export function Layout() {
  return (
    <div className="container">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img src={QantasLogo} alt="Qantas logo" width={200} />
        </a>
      </nav>
      <main className="py-3">
        <Outlet />
      </main>
    </div>
  );
}
