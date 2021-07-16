const express = require("express");
const path = require('path'); //a node native module
const {Menu, Item} = require('./models/index');
const {Restaurant} = require('./models/Restaurant')
const {sequelize} = require('./db')
const {seed} = require('./seed')
const { body,check, validationResult } = require('express-validator');


const app = express();
const port = 3000;
app.use(express.json());

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

app.post('/restaurants',
    body('name').isLength({min:3, max: 50}),body('name').isAlphanumeric(),body("image").isURL(), async (req, res)=> {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    await Restaurant.create(req.body);
    res.send('Created!')
})    

app.delete('/restaurants/:id',async (req, res)=>{
    await Restaurant.destroy({
        where : {id : req.params.id}
    })
    res.send("Deleted!!")
})

app.put('/restaurants/:id', async (req, res)=>{
    await Restaurant.update(req.body, {
        where : {id : req.params.id}
    })
    res.send('Updated!!');
})

app.patch('/restaurants/:id', async (req, res)=>{
    await Restaurant.update(req.body,{
        where : {id : req.params.id}
    })
    res.send('patched!')
})
//Q: What will our server be doing?
app.listen(port, async () => {
    await seed()
    console.log(`Server listening at http://localhost:${port}`);
});
