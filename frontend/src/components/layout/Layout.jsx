import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="layout__main">
        <TopBar />
        <div className="layout__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
