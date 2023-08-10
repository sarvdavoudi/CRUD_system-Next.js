import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [columns, setColumns] = useState([]);
  const [record, setRecord] = useState([]);
  const [refresh, setRefresh] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`); //"environment variable" used for APi url
        const data = response.data;
        setColumns(Object.keys(data[0]));
        setRecord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleDelete = (id) => {
    const conf = window.confirm("Are you sure want to delete?");
    if (conf) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`)
        .then((res) => {
          alert("Record has been deleted!");
          setRefresh(refresh + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">User Data</h1>
        <div>
          <Link href={"/create"} className="text-white bg-pink-600 hover:bg-pink-500 rounded-md py-2 px-4">
            Add +
          </Link>
        </div>
        <div className="flex flex-col mt-8">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>

                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {record.map((row, i) => (
                      <tr className="hover:bg-gray-100" key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href={`/update/${row.id}`} className="text-white -900 hover:bg-green-700 bg-green-300 px-4 py-2 rounded">
                            Update
                          </Link>

                          <button
                            onClick={(e) => handleDelete(row.id)}
                            className="ml-4 text-white -900  hover:bg-red-800 bg-red-300 px-4 py-2 rounded "
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
