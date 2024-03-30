import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
const { database_url, port } = config;

async function main() {
  try {
    // Mongoose
    await mongoose.connect(database_url as string);

    // server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log('DB connection error', err);
  }
}

main();
