import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Update = () => {
  // Dynamic Routes
  const router = useRouter();
  const { id } = router.query;  //variable that palce in {} must equal by name of [FolderName].js ====>  {id} equal by [id].js
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, data).then((res) => {
      alert("update successfully !");
      router.push("/");
    });
  };

  return (
    <form className="w-full max-w-md mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm mx-auto mt-8">
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
          className="bg-green-300 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
