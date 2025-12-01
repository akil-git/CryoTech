import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Package, MapPin, Heart, LogOut } from 'lucide-react';
import { User } from '../lib/types';

interface AccountPageProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function AccountPage({ user, setUser }: AccountPageProps) {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // Mock orders
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-11-25',
      total: 8999,
      status: 'delivered' as const,
      items: 2,
    },
    {
      id: 'ORD-002',
      date: '2024-11-27',
      total: 15999,
      status: 'shipped' as const,
      items: 1,
    },
    {
      id: 'ORD-003',
      date: '2024-11-29',
      total: 3499,
      status: 'processing' as const,
      items: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'shipped':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8">My Account</h1>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p>{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <a href="#orders" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Package className="w-5 h-5" />
                <span>My Orders</span>
              </a>
              <a href="#addresses" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MapPin className="w-5 h-5" />
                <span>Addresses</span>
              </a>
              <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          {/* Profile Info */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2>Profile Information</h2>
              <button className="text-blue-600 hover:underline">Edit</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <p>{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p>{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <p>{user.phone}</p>
                </div>
              )}
            </div>
          </section>

          {/* Orders */}
          <section id="orders" className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div key={order.id} className="border rounded-lg p-4 hover:border-blue-600 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p>Order #{order.id}</p>
                      <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">{order.items} item{order.items !== 1 ? 's' : ''}</p>
                    <p>৳{order.total.toLocaleString()}</p>
                  </div>
                  <button className="mt-3 text-blue-600 hover:underline text-sm">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Addresses */}
          <section id="addresses" className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2>Saved Addresses</h2>
              <button className="text-blue-600 hover:underline">Add New</button>
            </div>
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No saved addresses</p>
              <button className="mt-3 text-blue-600 hover:underline">Add your first address</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
