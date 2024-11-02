import cors from 'cors';
import express from 'express';

import { config } from './config/config';
import currencyRoutes from './routes/currencyRoutes';

const port = config.port;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", currencyRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
