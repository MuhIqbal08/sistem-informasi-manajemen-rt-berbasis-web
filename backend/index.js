const express = require('express');
const session = require('express-session');
const cors = require('cors');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dotenv = require('dotenv');
const db = require('./config/database'); 

const userRoute = require('./routes/user');
const roleRoute = require('./routes/role');
const authRoute = require('./routes/auth');
const pengajuanRoute = require('./routes/pengajuan');
const kasYearRoute = require('./routes/kasYear');
const paymentRoute = require('./routes/payment');
const agendaRoutes = require('./routes/agenda');
const pengumumanRoutes = require('./routes/pengumuman');
const galeriRouter = require('./routes/galeri');
const transaksiRoutes = require('./routes/transaksi');
const suratTtdRoute = require('./routes/suratTtd');

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Sequelize session store
const store = new SequelizeStore({ db });

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}));

// Static file path
app.use('/uploads', express.static('public/uploads'));

app.use(userRoute);
app.use(roleRoute);
app.use(authRoute);
app.use(pengajuanRoute);
app.use(kasYearRoute);
app.use(paymentRoute);
app.use(agendaRoutes);
app.use(roleRoute);
app.use(pengumumanRoutes);
app.use(galeriRouter);
app.use(suratTtdRoute)
app.use(transaksiRoutes);

store.sync();

module.exports = app;
