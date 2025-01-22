import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_KEY;

const JourneyCreate = () => {
  const [startTime, setStartTime] = useState('');
  const [launchList, setLaunchList] = useState([]);
  const [launchInfo, setLaunchInfo] = useState(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [selected, setSelected] = useState(null); // To store selected checkbox

  // Helper function to get current time in HH:MM AM/PM format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleRefreshTime = () => {
    setStartTime(getCurrentTime());
  };

  const fetchLaunchList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/launch/src/al`);
      if (response.data.error === false) {
        setLaunchList(response.data.data);
      } else {
        setLaunchList([]);
      }
    } catch (error) {
      console.log(error, 'error');
      setLaunchList([]);
    }
  };

  useEffect(() => {
    fetchLaunchList();
    setStartTime(getCurrentTime());
  }, []);

  // useEffect(() => {
  //   // Set the current time initially
  //   setStartTime(getCurrentTime());

  //   // Update the time every minute
  //   const intervalId = setInterval(() => {
  //     setStartTime(getCurrentTime());
  //   }, 60000); // Update every 60 seconds (1 minute)

  //   // Clear interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  const handleLaunchSelect = (e) => {
    const selectedId = e.target.value;
    const selectedLaunch = launchList.find(
      (launch) => launch.id === selectedId
    );
    if (selectedLaunch) {
      setLaunchInfo({
        launchName: selectedLaunch.launch_name,
        launchId: selectedLaunch.id,
      });
    }
  };

  const handleSideChage = (startVal, endVal) => {
    if (selected === `${startVal}-${endVal}`) {
      // Uncheck the selected checkbox, reset state
      setSelected(null);
      setStart('');
      setEnd('');
    } else {
      // Set the selected checkbox
      setSelected(`${startVal}-${endVal}`);
      setStart(startVal);
      setEnd(endVal);
    }
  };

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':').map(Number); // Split the input time and convert to numbers
    const isPM = hours >= 12;
    const hours12 = hours % 12 || 12; // Convert to 12-hour format (0 should become 12)
    const ampm = isPM ? 'PM' : 'AM';

    // Return the formatted time in 'hh:mm AM/PM' format
    return `${hours12.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finnalData = {
      launchName: launchInfo.launchName,
      launchId: launchInfo.launchId,
      startTime: convertTo12HourFormat(startTime),
      fullDate: new Date(),
      jrCretorId: '',
      start: start,
      end: end,
      destinationMsg: `${start} to ${end}`,
    };
    console.log('finl', finnalData);
  };

  return (
    <div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6 border border-red-900 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-90">
              Select an option
            </label>
            <select
              id="launches"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleLaunchSelect}
            >
              <option value="" disabled selected>
                Select a launch
              </option>
              {launchList.map((launch) => (
                <option key={launch.id} value={launch.id}>
                  {launch.launch_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="start"
                className="block text-sm font-medium text-gray-900"
              >
                Start Time
              </label>
              {/* Refresh Icon */}
              <button
                type="button"
                onClick={handleRefreshTime}
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                title="Refresh Time"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5v5h5M19.5 19.5v-5h-5m1.768-8.232A7.5 7.5 0 006.732 6.732m10.536 10.536a7.5 7.5 0 01-10.536 0"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-2">
              <input
                id="start"
                name="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="start"
              className="block text-sm font-medium text-gray-900"
            >
              Select a destination
            </label>
            <ul className="items-center w-full text-sm font-medium text-gray-900 border border-gray-200 rounded-lg sm:flex">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    type="checkbox"
                    onChange={() => handleSideChage('NB', 'NA')}
                    className={`w-4 h-4 rounded border-gray-300 ${
                      selected ? 'text-gray-400' : 'text-gray-900'
                    }`}
                    disabled={selected && selected !== 'NB-NA'}
                    checked={selected === 'NB-NA'}
                  />
                  <label
                    className={`w-full py-3 ms-2 text-sm font-medium ${
                      selected ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    NB to NA
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    type="checkbox"
                    onChange={() => handleSideChage('NA', 'NB')}
                    className={`w-4 h-4 rounded border-gray-300 ${
                      selected ? 'text-gray-400' : 'text-gray-900'
                    }`}
                    disabled={selected && selected !== 'NA-NB'}
                    checked={selected === 'NA-NB'}
                  />
                  <label
                    className={`w-full py-3 ms-2 text-sm font-medium ${
                      selected ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    NA to NB
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JourneyCreate;
