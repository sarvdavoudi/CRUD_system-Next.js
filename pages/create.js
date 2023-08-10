import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const Create = () => {
  const [inputData, setInputData] = useState({ name: "", email: "" });
   const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}/users`, inputData)
      .then((res) => {
        alert("data added successfully");
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
          id="name"
          type="text"
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
          id="email"
          type="text"
          onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Create;
