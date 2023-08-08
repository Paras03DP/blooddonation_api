require('dotenv').config();
const express = require('express');
const user_routes = require('./routes/user_routes');
const bloodDonation_routes = require('./routes/blood_donation_routes');
const upload = require('./middleware/upload');


const { verifyUser } = require('./middleware/auth');

const mongoose = require('mongoose');
const dbName = '/goFundLife'


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.send('<h1>Go Fund Life</h1>');
});

mongoose.connect('mongodb://127.0.0.1:27017' + dbName)
    .then(() => console.log('Connected successfully'))
    .catch((err) => console.log(err))

app.use('/users', user_routes);
app.use('/bloods', verifyUser, bloodDonation_routes);
// app.post('/uploads', upload.single('images'), (req, res) => {
//     res.json(req.file);
// })


app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === 'ValidatorError') res.status(400)
    else if (err.name === 'CastError') res.status(400)
    res.json({ error: err.message })
})


app.use((req, res) => {
    res.status(404).json({ error: "Path Not Found" })
})


app.listen(port, () => {
    console.log(`server is runing on ${port}`);
});


