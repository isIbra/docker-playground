import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
// const data = [
//   {
//     name: "latte",
//     price: 11,
//   },
//   {
//     name: "coffee of the day",
//     price: 9,
//   },
//   {
//     name: "cortado",
//     price: 10,
//   },
// ];

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [drink, setDrink] = useState({
    name: "",
    price: 0,
  });

  useEffect(() => {
    getData();
  }, [search]);

  async function getData() {
    const tempData = await axios.get(
      `http://localhost:3000/drinks?search=${search}`
    );

    setData(tempData.data.drinks);
  }

  async function addDrink() {
    const response = await axios({
      url: "http://localhost:3000/drinks/add",
      method: "post",
      data: drink,
    });
    await getData();
    setDrink({
      name: "",
      price: 0,
    });
  }

  async function delDrink(id) {
    const delDrink = await axios.delete(
      `http://localhost:3000/drinks/delete/${id}`
    );
    await getData();
  }

  return (
    <div className="flex flex-col justify-center">
      ``
      <div className="text-gray-500 bg-yellow-100 flex justify-center">
        <b>
          <h1>CAFE</h1>
        </b>
        <h2 className="mt-2">
          &<b>More</b>
        </h2>
      </div>
      <input
        className="mx-auto w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <table>
        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-[#bea829] dark:text-gray-800">
          <tr>
            <th scope="col" className="py-3 px-6">
              ID
            </th>
            <th scope="col" className="py-3 px-6">
              Type of coffee
            </th>
            <th scope="col" className="py-3 px-6">
              Price
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item, index) => (
            <>
              <tr
                key={item._id}
                className="bg-white border-b bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white"
                >
                  {index}
                </th>
                <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white">
                  {item.name}
                </td>
                <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white">
                  {item.price}
                </td>
                <AiFillCloseSquare
                  className="bg-red-500 cursor-pointer "
                  onClick={() => {
                    delDrink(item._id);
                  }}
                />
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="mb-6 text-center mt-2 ">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Your Drink
        </label>
        <input
          className="mx-auto w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your Drink"
          required
          value={drink.name}
          onChange={(event) => {
            setDrink({
              ...drink,
              name: event.target.value,
              // price: event.target.value,
            });
          }}
        />
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          value={drink.price}
          required
        >
          Your Price
        </label>
        <input
          type="number"
          className="mx-auto w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="10 R.S"
          required
          value={drink.price}
          onChange={(event) => {
            setDrink({
              ...drink,
              price: event.target.value,
            });
          }}
        ></input>
        <button
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            addDrink();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
