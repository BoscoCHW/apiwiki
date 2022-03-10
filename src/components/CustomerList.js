import { React, useState, useEffect } from "react";
// import "./index.css";

function CustomerList() {
  let [customers, setCustomers] = useState([]);
  let [clickButton, setClickButton] = useState(false);

  useEffect(() => {
    const inputBox = document.querySelector("input");
    const inputString = inputBox.value;
    inputBox.value = "";
    if (inputString) {
      const customer = {
        id: customers.length + 1,
        name: inputString,
      };
      setCustomers([...customers, customer]);
    }
  }, [clickButton]);

  return (
    <div className="mt-75 layout-column justify-content-center align-items-center">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          placeholder="Name"
          data-testid="app-input"
        />
        <button
          type="submit"
          onClick={() => setClickButton(!clickButton)}
          className="ml-30"
          data-testid="submit-button"
        >
          Add Customer
        </button>
      </section>

      {customers.length > 0 && (
        <ul className="styled mt-50" data-testid="customer-list">
          {customers.map((customer) => (
            <li
              className="slide-up-fade-in"
              data-testid={`list-item${customer.id}`}
              key={`list-item${customer.id}`}
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerList;
