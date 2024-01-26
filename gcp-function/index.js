const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

exports.processBucketEvent = async (event, context) => {
  const file = storage.bucket(event.bucket).file(event.name);
  
  // Perform actions on the file, for example, log its name
  console.log(`New file added: ${file.name}`);
};
