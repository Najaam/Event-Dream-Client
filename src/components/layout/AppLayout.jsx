import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
