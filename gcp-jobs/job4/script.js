// script.js
function runScript(scriptNumber) {
    console.log({scriptNumber});
    return new Promise((resolve, reject) => {
        // console.log(`Script ${scriptNumber} is running...`);
        console.log('TinTin');
        // setTimeout(() => {
        //     // Simulating an error
        //     if (scriptNumber === 2) {
        //         reject(new Error(`Script ${scriptNumber} encountered an error`));
        //     } else {
        //         console.log(`Script ${scriptNumber} is done.`);
        //         resolve(`Script ${scriptNumber} result`);
        //     }
        // }, 2000);
    });
}

// Example usage
runScript(process.argv[2])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error("An error occurred:", error.message);
        process.exit(1);
    });
