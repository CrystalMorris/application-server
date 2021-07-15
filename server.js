const express = require("express");
const path = require('path'); //a node native module
const {Menu, Item} = require('./models/index');
const {Restaurant} = require('./models/Restaurant')
const {sequelize} = require('./db')
const {seed} = require('./seed')


const app = express();
const port = 3000;

//Q: What does express.static help us do?
//Q: What do you think path.join helps us do?
app.use(express.static(path.join(__dirname, 'public')))

//will add routes
app.get('/flipcoin', async (req, res)=>{
   
    let result =  Math.round(Math.random());
        if(result === 0){
            result = "heads"
        } else {
            result ="tails"
        }
    console.log(result)
    res.send(result)
    })

//will add routes
app.get('/restaurants', async (req, res)=>{
    const allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants);
})

// app.get('/restaurants/:id', async (req, res)=>{
//     const restaurant = await Restaurant.findByPk(req.params.id)
//     res.json({restaurant})
// })

app.get('/restaurants/:id', async(req, res)=>{
    const result = await Restaurant.findByPk(req.params.id, {include : Menu })
    res.json(result)
})

app.get('/restaurants/:id/:menu', async(req, res)=>{
    const restaurant = await Restaurant.findByPk(req.params.id, {include:{ model : Menu, include: Item}})
  
    
    
   res.json(restaurant)
    
})


//Q: What will our server be doing?
app.listen(port, async () => {
    await seed()
    console.log(`Server listening at http://localhost:${port}`);
});
