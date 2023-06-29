import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Update = () => {
  const {id}=useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/users/'+id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('http://localhost:4000/users/'+id, data).then((res) => {
      alert("update successfully !");
    });
  };

  return (
    <form className="w-full max-w-md mx-auto mt-8">
      <div className="shadow-md rounded-md p-4">
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
            id="name"
            type="text"
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
            id="email"
            type="text"
            value={data.email}
            onChange={(event) => setData({ ...data, email: event.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default Update;
