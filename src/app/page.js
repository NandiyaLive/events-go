const HomePage = () => {
  return (
    <main>
      <div className="container mx-auto px-4 py-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Event Manager</h1>
          <p className="text-lg text-gray-600">
            Manage your events, venues, equipment, and personnel effortlessly.
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Explore</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold mb-2">Events</h3>
              <p>Manage upcoming events and schedules.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold mb-2">Venues</h3>
              <p>View and manage venue details and availability.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold mb-2">Equipment</h3>
              <p>Track equipment inventory and availability.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold mb-2">Personnel</h3>
              <p>Manage personnel roles and availability.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
