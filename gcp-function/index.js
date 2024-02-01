const { Storage } = require('@google-cloud/storage');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const createFolder = (folderName) => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    // console.error(err);
  }
}

exports.processBucketEvent = async (event, context) => {
  const customEvent = event.name.split('/');

  const file = customEvent[customEvent.length - 1];
  const bucket = event.bucket;

  // Download the file to a temporary location
  const storage = new Storage();
  const tempFilePath = `/tmp/${file}`;
  await storage.bucket(bucket).file('audio/' + file).download({ destination: tempFilePath });

  const fileName = file.split('.')[0];

  // Convert MP3 to HLS using FFmpeg
  createFolder(`/tmp/${fileName}`);
  const outputFilePath = `/tmp/${fileName}/${fileName}.m3u8`;
  const ffmpegCommand = `ffmpeg -i ${tempFilePath} -hls_time 10 -hls_list_size 0 -c:a aac -strict -2 ${outputFilePath}`;
  const hlsPath = `hls/${fileName}/${fileName}.m3u8`;
  
  await exec(ffmpegCommand, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during FFmpeg conversion: ${stderr}`);
      return;
    }

    // Upload the HLS files back to Cloud Storage
    // storage.bucket(bucket).upload(outputFilePath, { destination: hlsPath });
    const localFolderPath = `/tmp/${fileName}`;

  // Replace 'remote-folder-path' with the desired path inside the bucket
  const remoteFolderPath = `hls/${fileName}`;
    const files = await fs.promises.readdir(localFolderPath);

    for (const file of files) {
      const filePath = path.join(localFolderPath, file);
      const destinationPath = path.join(remoteFolderPath, file);

      await storage.bucket(bucket).upload(filePath, {
        destination: destinationPath,
      });

      console.log(`File ${file} uploaded to ${destinationPath}`);
    }
    });
};