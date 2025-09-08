import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/mongodb.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on PORT :${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
