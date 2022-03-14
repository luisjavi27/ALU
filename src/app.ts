import express from 'express';
import config from './config/config';
import router  from './routes/router';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// app.use(router.getcu)
// app.use(saldoController)

app.listen(config.PORT, () => {
  
  return console.log(`El Servidor en el puerto ${config.PORT}`);
});

router(app);