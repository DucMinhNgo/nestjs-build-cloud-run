// Retrieve Job-defined env vars
const {CLOUD_RUN_TASK_INDEX = 0, CLOUD_RUN_TASK_ATTEMPT = 0} = process.env;
const { exec } = require('child_process');

const main = async () => {
    console.log(
        `Starting Task #${CLOUD_RUN_TASK_INDEX}, Attempt #${CLOUD_RUN_TASK_ATTEMPT}...`
    );

    console.log('================================================');
    console.log('Job dustin running');
    await exec('chmod +x ./script.sh');
    await exec('./script.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    
    console.log(
    `End Task #${CLOUD_RUN_TASK_INDEX}, Attempt #${CLOUD_RUN_TASK_ATTEMPT}...`
    );
}

// Start script
main().catch(err => {
    console.error(err);
    process.exit(1); // Retry Job Task by exiting the process
});