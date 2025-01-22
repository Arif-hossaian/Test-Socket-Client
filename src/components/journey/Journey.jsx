import LaunchTracker from './CurrentJourneyList';
import JourneyCreate from './JourneyCreate';
import LaunchList from './OnlineLaunchList';

const Journey = () => {
  return (
    <div className="w-full">
      <JourneyCreate />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full">
        <div className="col-span-2">
          <LaunchTracker />
        </div>
        <div>
          <LaunchList />
        </div>
      </div>
    </div>
  );
};

export default Journey;
