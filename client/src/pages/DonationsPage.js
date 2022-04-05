import React, { Component,  useState } from 'react'
import Navigation from '../components/Nav';
// import '../styles/donations.css'
import { Button } from 'react-bootstrap';

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
      <>
        <Navigation/>

        <div className='container my-3'>

          <h2>Wanna buy us a coffee, or two? <span className='lead text-muted'>~(donate $5 each coffee ^o^)~</span></h2>

          <h4># of Coffees: {count}</h4>

          <Button
            variant="outline-dark"
            type="button"
            onClick={handleDecrement}
          >Take Away</Button>
          {' '}
          <Button
            variant="outline-dark"
            type="button"
            onClick={handleIncrement}>
            Add
          </Button>

          <hr/>

          <Button variant="dark" onClick={handleFormSubmit}>Yes, I would like to buy you guys {count} coffee(s)</Button>

        </div>
      </>
    )

}

export default DonationsPage;