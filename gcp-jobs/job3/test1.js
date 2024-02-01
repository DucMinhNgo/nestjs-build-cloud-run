console.log("Test 1");

const myPromise = new Promise((resolve, reject) => {
// Asynchronous operation or logic here
const operationSuccessful = false; // For example purposes

if (operationSuccessful) {
    resolve("Operation was successful!"); // Resolve the promise
} else {
    reject("Operation failed!"); // Reject the promise
    new Error("test_1_failed");
    console.log("================================================");
    console.error("test_1_failed");
    console.log("================================================");
    // process.exit(1);
}
});
  
// Using the promise
myPromise
.then((result) => {
    console.log(result); // Output: Operation was successful!
})
.catch((error) => {
    console.error(error); // Output: Operation failed!
});
  