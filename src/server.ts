import app from './app';

import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(` app listing on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
