import React, { Component,  useState } from 'react'
import Nav from '../components/Nav';

const  DonationsPage = () =>{
  const [count, setCount] = useState(1);
  // Helper function to handle when the user clicks increment
  const handleIncrement = () => {
    setCount(num => Math.min(100, num + 1));
  };
  // Helper function to handle when the user clicks decrement
  const handleDecrement = () => {
    setCount(num => Math.max(1, num - 1));
  };
  const handleFormSubmit = () => {
    fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: count },
        ],
      }),
    })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch(e => {
        console.error(e.error)
      })
  }
    return (
      <div>
        <Nav/>
          <h1>Buy us a Coffee Maybe? (Donate $5)</h1>

          <h2>Number of Coffees:{count}</h2>
          <button
        type="button"
        className="btn btn-primary"
        onClick={handleDecrement}
      >Decrement</button>
          <button
        type="button"
        className="btn btn-primary"
        onClick={handleIncrement}
      >
        Increment
      </button>

<hr/>
          <button onClick={handleFormSubmit}>Yes, I would Like to buy you guys {count} Coffee(s)</button>
          
      </div>
    )

}

export default DonationsPage