import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck2, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/common/Button';
import { StatCard } from '../components/common/StatCard';

export function LandingPage() {
  const menuPackages = [
    {
      title: 'Mehndi 1',
      items: ['Halwa Puri', 'Shahi Chanay', 'Roghni Naan', 'Fresh Salad', 'Mint Raita'],
    },
    {
      title: 'Mehndi 2',
      items: ['Chicken Qorma', 'Tikka Boti/Kebab', 'Zarda / Mutanjan', 'Roghni Naan & Roti', 'Mint Raita'],
    },
    {
      title: 'Mehndi 3',
      items: ['Halwa Puri', 'Chicken Chanay', 'Seekh Kebab', 'Chicken Boti', 'Mint Raita'],
    },
    {
      title: 'Chicken 1 Dish',
      items: ['Chicken Qorma', 'Chicken Biryani / Pulao', 'Fresh Salad', 'Roghni Naan & Roti', '1 Sweet Dish'],
    },
    {
      title: 'Beef 1 Dish',
      items: ['Beef Qorma', 'Chicken Biryani / Pulao', 'Fresh Salad', 'Mint Raita', '1 Sweet Dish'],
    },
    {
      title: 'Mutton 1 Dish',
      items: ['Mutton Qorma', 'Chicken Biryani / Pulao', 'Fresh Salad', 'Mint Raita', '1 Sweet Dish'],
    },
    {
      title: 'Special Cuisine 1',
      items: ['Chicken Roast', 'Chicken Qorma', 'Chicken Biryani / Pulao', 'Variety of Salads', '1 Sweet Dish'],
    },
    {
      title: 'Special Cuisine 2',
      items: ['Beef Qorma', 'Chicken Roast', 'Chicken Biryani / Pulao', 'Variety of Salads', '1 Sweet Dish'],
    },
    {
      title: 'Special Cuisine 3',
      items: ['Mutton Qorma', 'Chicken Roast / Tikka', 'Chicken Biryani / Pulao', 'Variety of Salads', '1 Sweet Dish'],
    },
    {
      title: 'Royal Cuisine',
      items: ['Welcome Drinks / Soup', 'Chicken Tikka Boti', 'Mutton Qorma', '2 Sweet Dishes', 'Variety of Salads'],
    },
    {
      title: 'Salads & Soups',
      items: ['Russian / Mango / Fruit Salad', 'Pasta / Macaroni Salad', 'Chicken Corn Soup', 'Hot & Sour Soup', 'Taj Special Soup'],
    },
    {
      title: 'Additional Choice',
      items: ['Gol Gappay', 'Dahi Baray / Channa Chaat', 'Kulfa / Chocolate Fountain', 'Gulab Jaman', 'Fish Fry'],
    },
    {
      title: 'Desserts',
      items: ['Shahi Tukra', 'Kheer / Firni', 'Fruit Trifle', 'Ice Cream / Qulfa Falooda', 'Wedding Cake'],
    },
    {
      title: 'Beverages',
      items: ['Soft Drink', 'Mint Margarita', 'Pina Colada', 'Kashmiri Tea', 'Seasonal Fresh Juices'],
    },
  ];

  return (
    <AppLayout>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <span className="badge">Professional venue booking platform</span>
            <h1>Book premium event venues with a polished role-based experience</h1>
            <p>
              Users discover venues and submit booking requests. Admins manage venue inventory,
              review reservations, and control platform operations from a dedicated dashboard.
            </p>
            <div className="hero-actions">
              <Link to="/venues"><Button>Explore Venues <ArrowRight size={16} /></Button></Link>
              <Link to="/auth"><Button variant="secondary">Login / Register</Button></Link>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-card-grid">
              <StatCard
                label="User Journey"
                value="Browse → Book"
                hint="Venue discovery and booking requests"
              />
              <StatCard
                label="Admin Control"
                value="Manage All"
                hint="Venue CRUD and booking review"
              />
              <StatCard
                label="Access Model"
                value="JWT + Roles"
                hint="Single auth page with role-based routing"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="menu-slider-section">
        <div className="container">
          <div className="menu-slider-header">
            <span className="badge">Catering packages</span>
            <h2>Explore curated menu packages for your event</h2>
            <p>
              Choose from mehndi menus, signature cuisine options, desserts, beverages,
              and add-on selections for weddings and event bookings.
            </p>
          </div>

          <div className="menu-slider-wrap">
            <div className="menu-slider-track">
              {[...menuPackages, ...menuPackages].map((menu, index) => (
                <div className="menu-package-card" key={`${menu.title}-${index}`}>
                  <div className="menu-package-top">
                    <span className="menu-package-tag">Popular Menu</span>
                    <h3>{menu.title}</h3>
                  </div>

                  <ul className="menu-package-list">
                    {menu.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>

                  <div className="menu-package-footer">
                    <span>Customizable package</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section container">
        <div className="feature-card"><CalendarCheck2 size={22} /><h3>Smart booking flow</h3><p>Users can submit complete event details, guest count, date range, and special requirements.</p></div>
        <div className="feature-card"><LayoutDashboard size={22} /><h3>Dedicated dashboards</h3><p>The interface redirects users and admins to different workspaces after a shared authentication flow.</p></div>
        <div className="feature-card"><ShieldCheck size={22} /><h3>Operational clarity</h3><p>Admins can create venues, update inventory, and approve or reject booking requests from one place.</p></div>
      </section>
    </AppLayout>
  );
}