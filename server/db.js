// index.js
module.exports = () => {
  const data = { bookings: [] }
  // Create 1000 users
  for (let i = 0; i < 35; i++) {
    data.bookings.push({ 
      booking_id: i, 
      user_id: (35-i),
      username: `testUser${i}`,
      start_date: `2020-01-0${i%8}T20:21:21.234Z`,
      type: `parking`,
      item_info: `Koszykowa ${i}`,
      active: i%3===0 ? true : false,
      item_id: i*2
    })
  }
  return data
}

// "booking_id": 1,
// "user_id": 1,
// "username": "reactlol",
// "start_date": "2020-01-08T20:21:21.234Z",
// "type": "cars",
// "item_info": "ELS 13PM",
// "active": true,
// "item_id": 12