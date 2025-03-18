import React, {useState} from 'react';
import { updateStatus } from '../services/admin';

const ChangeStatus = () => {
    // ['pending', 'completed', 'failed']
    const [data, setData] = useState({
        vin: "",
        status: "pending"
    })

    const handleSumit = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            const response = await updateStatus(data);
           // console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-center mb-6">Change Status</h1>
      <div className="flex justify-center">
        <form className="w-full max-w-sm" onSubmit={handleSumit}>
          {/* VIN Input */}
          <div className="mb-4">
            <label htmlFor="vin" className="block text-gray-700 font-medium mb-2">
              VIN:
            </label>
            <input
              type="text"
              name="vin"
              id="vin"
              value={data.vin}
              onChange={(e) => setData({...data, vin: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter VIN for verification"
              required
            />
          </div>

          {/* Status Select */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
              Status:
            </label>
            <select 
              value={data.status}
              onChange={(e) => setData({...data, status: e.target.value })}
              name="status"
              id="status"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {/* ['pending', 'completed', 'failed'] */}
              <option value="pending">pending</option>
              <option value="completed">completed</option>
              <option value="failed">failed</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button type='submit' className='
            w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
            cursor-pointer'>
                Change Status
            </button>
          </div>

          {/* Add your submit function here */}
        </form>
      </div>
    </div>
  )
}

export default ChangeStatus
