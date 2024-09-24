import React, { useState } from "react";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";
import Logo from "../assets/logo.svg";

const Table = () => {
  const [items, setItems] = useState([{ itemName: "", price: "", users: "" }]);

  const addItem = () => {
    setItems([...items, { itemName: "", price: "", users: "" }]);
  };

  const removeItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [name]: value };
    setItems(newItems);
  };

  const validateFields = () => {
    for (let i = 0; i < items.length; i++) {
      const { itemName, price, users } = items[i];
      if (!itemName.trim() || !price.trim() || !users.trim()) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields before proceeding!",
        });
        return false;
      }
    }
    return true;
  };

  const generatePDF = (htmlContent) => {
    const header = `
      <div class="text-center pb-4">
        <img src=${Logo} alt="Logo" class="h-12 mx-auto bg-red-500 p-1 rounded-full">
        <h1 class="text-xl font-bold">BillBuddy</h1>
      </div>
      <a href="https://billbuddy.vercel.app">Website Link</a>`;

    const footer = `
      <div class="text-center pt-4">
        <p class="text-sm">Made with ❤️ by Faraz</p>
      </div>`;

    const css = `
      <style>
        .page-break { page-break-before: always; }
        .avoid-break { page-break-inside: avoid; }
      </style>`;

    const paddedHtmlContent = `
      ${css}
      <div class="p-5">
        ${header}
        <div class="py-5 avoid-break">
          ${htmlContent}
        </div>
        ${footer}
      </div>`;

    html2pdf()
      .from(paddedHtmlContent)
      .set({
        margin: 10,
        filename: "BillBuddy.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  const next = () => {
    if (validateFields()) {
      const userReceipts = {};
      let overall = 0;
      const overallBillItems = [];

      for (let i = 0; i < items.length; i++) {
        const { itemName, price, users } = items[i];
        const priceValue = parseFloat(price);

        if (isNaN(priceValue) || priceValue <= 0) {
          Swal.fire({
            icon: "error",
            title: "Invalid Price",
            text: "Please enter a valid price for all items!",
          });
          return;
        }

        const userList = users.split(",").map((user) => user.trim());
        overall += priceValue;

        overallBillItems.push({ itemName, price: priceValue, users: userList });

        userList.forEach((user) => {
          if (!userReceipts[user]) {
            userReceipts[user] = { items: [], total: 0 };
          }
          userReceipts[user].items.push({
            itemName,
            price: priceValue / userList.length,
          });
          userReceipts[user].total += priceValue / userList.length;
        });
      }

      Swal.fire({
        title: "Bill Breakdown",
        html: renderResult(userReceipts, overallBillItems, overall),
        confirmButtonText: "Print",
      }).then((result) => {
        if (result.isConfirmed) {
          generatePDF(renderResult(userReceipts, overallBillItems, overall));
        }
      });
    }
  };

  const renderResult = (userReceipts, overallBillItems, overallTotal) => {
    return `
      <div class="container mx-auto">
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-2">Overall Bill</h2>
          <table class="w-full border-collapse border">
            <thead>
              <tr>
                <th class="border px-4 py-2">Item</th>
                <th class="border px-4 py-2">Price</th>
                <th class="border px-4 py-2">Split between</th>
              </tr>
            </thead>
            <tbody>
              ${overallBillItems
                .map(
                  (item) => `
                    <tr>
                      <td class="border px-4 py-2">${item.itemName}</td>
                      <td class="border px-4 py-2">₹${item.price.toFixed(
                        2
                      )}</td>
                      <td class="border px-4 py-2">${item.users.join(", ")}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="border px-4 py-2"><strong>Overall Total:</strong></td>
                <td class="border px-4 py-2">₹${overallTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        ${Object.entries(userReceipts)
          .map(
            ([user, { items, total }]) => `
              <div class="mb-8">
                <h2 class="text-2xl font-bold mb-2">${user}</h2>
                <table class="w-full border-collapse border">
                  <thead>
                    <tr>
                      <th class="border px-4 py-2">Item</th>
                      <th class="border px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items
                      .map(
                        (item) => `
                          <tr>
                            <td class="border px-4 py-2">${item.itemName}</td>
                            <td class="border px-4 py-2">₹${item.price.toFixed(
                              2
                            )}</td>
                          </tr>
                        `
                      )
                      .join("")}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="1" class="border px-4 py-2"><strong>Total:</strong></td>
                      <td class="border px-4 py-2">₹${total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  };

  const reset = () => {
    setItems([{ itemName: "", price: "", users: "" }]);
  };

  return (
    <div className="text-gray-400 bg-gray-900 flex items-center justify-center">
      <div className="container px-5 py-12 mx-auto">
        <div>
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Enter item details
            </h1>
          </div>
          <div className="flex justify-end items-center gap-2">
            <button
              title="Increase Item"
              className="h-10 w-10 text-white bg-red-500 border-0 focus:outline-none hover:bg-red-600 text-lg rounded-full"
              onClick={addItem}
            >
              +
            </button>
            <button
              title="Decrease Item"
              className="h-10 w-10 text-white bg-red-500 border-0 focus:outline-none hover:bg-red-600 text-lg rounded-full"
              onClick={removeItem}
            >
              -
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-white text-xl font-semibold">
                <th>Item Name</th>
                <th>Price</th>
                <th>Users (comma separated)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      id={`itemName-${index}`}
                      name="itemName"
                      className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={item.itemName}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={`price-${index}`}
                      name="price"
                      className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={item.price}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={`users-${index}`}
                      name="users"
                      className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-red-500 focus:bg-gray-900 focus:ring-2 focus:ring-red-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={item.users}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex mt-8">
          <button
            className="mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg"
            onClick={next}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
