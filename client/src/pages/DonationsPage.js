import React, { Component } from 'react'

const  DonationsPage = () =>{

const handleFormSubmit = () => {
    fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1 },
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
          <h1>Buy us a Coffee Maybe? (Donate $5)</h1>
          
          <button onClick={handleFormSubmit}>Yes, I would Like to buy you guys a Coffee</button>
          
      </div>
    )

}

export default DonationsPage