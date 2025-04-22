import Navbar from './components/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex flex-col lg:flex-row">
        <Navbar />
        <main className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
          </div>
        </main>
      </div>
    </div>
  );
} 