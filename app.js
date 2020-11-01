const path = require('path')
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/link', require('./routes/link.routes'))

app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = config.get('port') || 5000;
const DATA_BASE_URI = config.get('mongoURI') || '';

async function start() {
    try 
    {
        await mongoose.connect(DATA_BASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has benn started on port: ${PORT}`))
    }
    catch (e) 
    {
        console.log(`Server error: ${e}`);
        process.exit(1)
    }
}

start();