import React, { useContext} from 'react';
import { AdminContext } from '../context/AdminAuth.context';


const AdminBoard = () => {
 const {data} = useContext(AdminContext);
 return (
  <div className="p-4">
    <div>
      <h2 className="text-2xl font-semibold mb-4">All forms</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Vin</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Register Amount</th>
              <th className="py-2 px-4 text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((data) => {
                return (
                  <tr key={data._id} className="border-t">
                    <td className="py-2 px-4">{data.vin}</td>
                    <td className="py-2 px-4">{data.status}</td>
                    <td className="py-2 px-4">{data.registerAmount}</td>
                    <td className="py-2 px-4">{data.user}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

}

export default AdminBoard

{/* <div className="min-h-screen bg-gray-100 p-6">
<div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
  <h1 className="text-2xl font-semibold text-gray-800 mb-6">Complete detail</h1>
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse bg-white">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left text-gray-700 border-b">Category</th>
          <th className="px-4 py-2 text-left text-gray-700 border-b">Feature</th>
          <th className="px-4 py-2 text-left text-gray-700 border-b">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 border-b">User Information</td>
          <td className="px-4 py-2 border-b">Email</td>
          <td className="px-4 py-2 border-b">user1@gmail.com</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">User Information</td>
          <td className="px-4 py-2 border-b">Role</td>
          <td className="px-4 py-2 border-b">USER</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">User Information</td>
          <td className="px-4 py-2 border-b">Status</td>
          <td className="px-4 py-2 border-b">Pending</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">User Information</td>
          <td className="px-4 py-2 border-b">Register Amount</td>
          <td className="px-4 py-2 border-b">3000</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">User Details</td>
          <td className="px-4 py-2 border-b">Name</td>
          <td className="px-4 py-2 border-b">snk ktri</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">User Details</td>
          <td className="px-4 py-2 border-b">Phone Number</td>
          <td className="px-4 py-2 border-b">98765432109</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">User Details</td>
          <td className="px-4 py-2 border-b">Address</td>
          <td className="px-4 py-2 border-b">Besishahar, Lamjung, Gandaki (Municipality, Wada No. 7)</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Vehicle Details</td>
          <td className="px-4 py-2 border-b">Brand</td>
          <td className="px-4 py-2 border-b">fdf</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Vehicle Details</td>
          <td className="px-4 py-2 border-b">Model</td>
          <td className="px-4 py-2 border-b">dsf</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Vehicle Details</td>
          <td className="px-4 py-2 border-b">Color</td>
          <td className="px-4 py-2 border-b">fdsa</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Vehicle Details</td>
          <td className="px-4 py-2 border-b">Type</td>
          <td className="px-4 py-2 border-b">Car</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Vehicle Details</td>
          <td className="px-4 py-2 border-b">Fuel Type</td>
          <td className="px-4 py-2 border-b">Gasoline</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Vehicle Details</td>
          <td className="px-4 py-2 border-b">Engine Number</td>
          <td className="px-4 py-2 border-b">1111</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Registration Info</td>
          <td className="px-4 py-2 border-b">Registration Number</td>
          <td className="px-4 py-2 border-b">G-7442-L</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Registration Info</td>
          <td className="px-4 py-2 border-b">Register Date</td>
          <td className="px-4 py-2 border-b">March 19, 2025</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border-b">Registration Info</td>
          <td className="px-4 py-2 border-b">Expiry Date</td>
          <td className="px-4 py-2 border-b">March 28, 2025</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div> */}
