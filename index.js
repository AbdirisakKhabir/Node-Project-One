const express = require('express')
const server = require('./api/server');
const users = require('./api/users/model')


const port = 9000;

// START YOUR SERVER HERE
const app = express()



app.use(express.json())

// get Endpoint
app.get("/", (req,res) => {
res.json("Hello from express")

})

//Get all Users
app.get('/api/users', (req, res) => {
    users.find()
    .then(users => {
        res.json(users)
    })
    .catch(() => {
        req.status(500).json({ message: "could not find the User"})
    })
})

//Get one User

app.get('/api/users/:id', (req , res) => {
    let {id} = req.params   //URL 

    users.findById(id)
    .then(user => {
        console.log(user)
   
    if (user == null) {
        res.status(404).json({message: `user ${id} not Found`})
    }else {
         res.json(user)
    }
   
})
.catch (() => {
    req.status(500).json({ message: "could not find the User"})
})

})

//Add User
app.post('/api/users', (req, res) => {
    let body = req.body
    if(!body.name){
        res.status(500).json({message: 'Name is Required'})
    }else {
        users.insert(body)
        .then(user =>{
            res.status(200).json(user)
        })
        .catch(() =>{
            res.status(500).json({message:'could not Create Th User '})
        })
    }
})

//Update User

app.put('/api/users/:id', async (req, res) => {
    let {id} = req.params

    try{
        let body =  req.body;
        let newUser = await users.update(id, body)
        if(newUser === null){
            res.status(404).json({message: "Empty Feild is Not Allowed"})
            return
        }
        else{
            res.status(200).json(newUser)
        }
        }
        catch{
            res.status(500).json({ message: "could not Update User"})
        }
    
})


//Delete User
app.delete('/api/users/:id', (req,res) => {
    let {id} = req.params
    users.remove(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(() =>{
        console.log('Could Not Delete User')
    })
})



app.listen(port), () => {
    console.log("server Started")

}


