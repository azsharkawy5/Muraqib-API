import './src/config/bigint-polyfill.js';
import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
