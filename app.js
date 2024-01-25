const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes')
const config = require('./config')
// const dbURL = 'mongodb://localhost:27017/Sudhakar'
const app = express();
const { connectAllDb } = require('./config/multi-tenant/connectionManager')


// When we need single Database , then use below code for DB configuration

// mongoose.connect(dbURL, {
//     useNewUrlParser: true,
// })
// // dotenv.config()
// const db = mongoose.connection;

// db.on('error', (error) => {
//     console.error('MongoDB connection error', error)
// })

// db.on('open', () => {
//     console.info('*******************')
//     console.info('MongoDB connection successfully.')
//     console.info('*******************')

// })

// // Error handling
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke! or Server Crashing!')
// })


// const server = require('http').createServer(app);
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Define routes
app.use('/api', routes);

// When we need Multitenant Database , then use below code for DB configuration
connectAllDb()


// Start Server
const port = config.SERVER.PORT || 9000;
app.listen(port, () => {
    console.info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.info(`\t SERVER IS RUNNING SUCCESSFUL ON PORT : ${port}`)
    console.info('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
})
