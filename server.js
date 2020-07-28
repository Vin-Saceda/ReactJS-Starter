const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const items = require('./routes/api/items')

const app = express()

app.use(bodyParser.json())

const db = require('./config/key').mongoURI

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err))

app.use('/api/items', items)

if ( process.end.NODE_ENV === production ){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

let port = process.env.PORT || 5000
app.listen(port, () => console.log('Running on port '+port))