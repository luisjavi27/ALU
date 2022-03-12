import express from 'express';
import config from './config/config';
import router  from './routes/router';


const app = express();

app.use(express.json());



// app.use(router.getcu)
// app.use(saldoController)

app.listen(config.PORT, () => {
  
  return console.log(`El Servidor en el puerto ${config.PORT}`);
});

router(app);