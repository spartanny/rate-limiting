import express from "express";

const app = express();
const PORT = 3000;

// Middleware to support json content parsing
app.use(express.json());


// In memory otp store ; can be replaced by a db implementation as well
const otpStore : Record<string, string> = {}

app.post('/generate-otp', (req, res) => {
    // extract email from request body
    const email = req.body.email;
    if(!email) {
        res.status(400).json({message : "Email is required !"});
    }

    const min = 1000000;
    const max = 10000000; 
    const otp = Math.floor(Math.random() * (max - min) + min).toString();

    otpStore[email] = otp;

    // Roll out an email to the input email
    console.log(`OTP generated : ${otp} for ${email}`);
    res.status(200).json({message : "OTP generated successfully !"});
})


app.post('/reset-password', (req, res) => {
    
    const {email, otp, password } = req.body;
    if(!email || !otp || !password) {
        res.status(400).json({message : "Please provide valid details !"});
    }

    if(otp == otpStore[email]) {
        delete otpStore[email];
        console.log("Password successfully resetted !");
        res.status(200).json({message : "Password has been reset successfully !"});
    } else {
        res.status(401).json({message : "Invalid OTP !"})
    }

})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})