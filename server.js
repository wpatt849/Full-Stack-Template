const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'fullstack_template',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to Database')
        db = client.db(dbName)
        collection = db.collection('templateDocs')
    })    

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', async(req,res) => {
    try{
        res.render('index.ejs')
    }catch(error){
        res.status(500).send({message: error.message})
    }
})



app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running ${process.env.PORT}`)
})