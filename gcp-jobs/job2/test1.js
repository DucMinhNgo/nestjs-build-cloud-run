console.log("Test 1");
const { exec } = require('child_process');

const myPromise = new Promise((resolve, reject) => {
// Asynchronous operation or logic here
const operationSuccessful = false; // For example purposes

if (operationSuccessful) {
    resolve("Operation was successful!"); // Resolve the promise
} else {
    reject("Operation failed!"); // Reject the promise
}
});


// Function to simulate a script with an error
function runScript(scriptNumber) {
    return new Promise((resolve, reject) => {
        // console.log(`Script ${scriptNumber} is running...`);
        // Simulating an error
        if (scriptNumber === 2) {
            reject(new Error(`Script ${scriptNumber} encountered an error`));
        } else {
            // console.log(`Script ${scriptNumber} is done.`);
            resolve(process.exit(1));
        }
    });
}


let isSuccess = true;
// Using the promise
myPromise
.then((result) => {
    console.log(result); // Output: Operation was successful!
})
.catch(async (error) => {
    isSuccess = false;
    // setTimeout(() => {
    //     throw new Error('LOI_ROI');
    // }, 1000)
    // setTimeout(() => {
    //     process.exit(1);
    // }, 1000);
    // Run two scripts simultaneously
    Promise.allSettled([
        runScript(1),
        runScript(2).then(null, (error) => {
            // Handle the error and exit
            console.error("An error occurred:", error.message);
            throw new Error('LOI_ROI');
        })
    ])
    .then((results) => {
        console.log("All scripts completed successfully:", results);
    })
    .catch((error) => {
        console.error("An unexpected error occurred:", error.message);
    });
})
  