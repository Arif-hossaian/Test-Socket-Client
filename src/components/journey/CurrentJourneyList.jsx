const LaunchTracker = () => {
  const launches = [
    {
      id: 'L123',
      launchNumber: 'Launch A',
      from: 'New York',
      to: 'Los Angeles',
      status: 'In Transit',
      departureTime: '10:30 AM',
      estimatedArrival: '4:30 PM',
    },
    {
      id: 'L124',
      launchNumber: 'Launch B',
      from: 'Chicago',
      to: 'Miami',
      status: 'Departing',
      departureTime: '11:45 AM',
      estimatedArrival: '3:15 PM',
    },
  ];

  return (
    <div className="mx-10 mt-3 p-6 space-y-6 border border-green-500 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Current Journey List</h2>

      {launches.map((launch) => (
        <div
          key={launch.id}
          className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {launch.launchNumber}
              </h3>
              <p className="text-sm text-gray-500">
                Departure: {launch.departureTime} | ETA:{' '}
                {launch.estimatedArrival}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {launch.status}
            </span>
          </div>

          <div className="my-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium text-gray-700">{launch.from}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">{launch.to}</span>
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              </div>
            </div>

            {/* Simple Arrow Animation Container */}
            <div className="relative h-12 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-lg overflow-hidden">
              {/* First Arrow Set */}
              <div className="absolute inset-0 flex items-center animate-moveRight">
                {[...Array(40)].map((_, i) => (
                  <span
                    key={`arrow1-${i}`}
                    className="text-blue-500 font-bold text-xl mr-6"
                    style={{ fontFamily: 'monospace' }}
                  >
                    &gt;
                  </span>
                ))}
              </div>

              {/* Second Arrow Set */}
              <div className="absolute inset-0 flex items-center animate-moveRight2">
                {[...Array(40)].map((_, i) => (
                  <span
                    key={`arrow2-${i}`}
                    className="text-blue-500 font-bold text-xl mr-6"
                    style={{ fontFamily: 'monospace' }}
                  >
                    &gt;
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>In Progress</span>
            <span>Estimated Time: {launch.estimatedArrival}</span>
          </div>
        </div>
      ))}

      <style jsx global>{`
        @keyframes moveRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes moveRight2 {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-moveRight {
          animation: moveRight 3s linear infinite;
        }

        .animate-moveRight2 {
          animation: moveRight2 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LaunchTracker;
