import { useState } from 'react';

const JourneyCreate = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [launchList, setLaunchList] = useState([]);
  const [rightSide, setRightSide] = useState(false);
  const [leftSide, setLeftSide] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      startTime,
      endTime,
      description,
    };
    console.log('serivedata', serviceData);

    //   try {
    //     const apiUrl = import.meta.env.VITE_API_KEY;

    //     const response = await axios.post(`${apiUrl}/services`, serviceData);
    //   } catch (error) {
    //     console.error('Error creating service:', error);
    //     alert('Error creating service');
    //   }
  };
  return (
    <div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 border border-red-900 rounded-md p-3"
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-90">
              Select an option
            </label>
            <select
              id="countries"
              className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Choose launch</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Start Time
            </label>
            <div className="mt-2">
              <input
                id="start"
                name="startTime"
                type="time"
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-90">
              Select an option
            </label>

            <ul className="items-center w-full text-sm font-medium text-gray-900  border border-gray-200 rounded-lg sm:flex ">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                  />
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                    Right to Left
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                <div className="flex items-center ps-3">
                  <input
                    id="react-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                  />
                  <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 ">
                    Left to Right
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
        {/* 
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p> */}
      </div>
    </div>
  );
};

export default JourneyCreate;
