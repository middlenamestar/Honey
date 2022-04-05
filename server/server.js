require('dotenv').config();
const cors = require("cors")
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const routes = require('./routes');
const db = require('./config/connection');

// for chat function
const http = require("http");
const {Server} = require("socket.io")
app.use(
  cors({
    origin: "https://p3honey.herokuapp.com/",
    
  })
)

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://p3honey.herokuapp.com/",
    methods: ["GET", "POST"]
  },
});

// run when client connects
io.on('connection', (socket) => {
  //console.log(`User Connected: ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })
 
  socket.on('disconnect', () => {
    io.emit('User Disconnected', socket.id)
  })
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Stripe Tings

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const storeItems = new Map([
  [1, {priceinCents:500, name: "$5 Dollar Donation"}],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceinCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
    console.log(e.message)
  }
})

app.get("/cancel", (req,res) => { 
  res.redirect("/donationsPage")
})

//------------------------------------------- End of Strip tings -------------------------------------//











// If this is production allow static files to be served from the build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// app.listen(PORT, ()=>{
//     console.log("App is listening on: http://localhost:" + PORT)
// })

// 404
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});