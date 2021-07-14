const express = require("express");
const path = require('path'); //a node native module
const {Item} = require('./models/index');
const {Restaurant} = require('./models/Restaurant')

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


//Q: What will our server be doing?
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
