const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require("./models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
require('dotenv').config()
const app = express();
const path = require("path");
const multer = require("multer");
const Place = require('./models/Place.js');
const fs = require("fs")


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "jivohjikohnipwjnigrjnikophjinkgojnoe"

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, "/uploads")));


mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) =>{
    res.json('test good')
});

app.post('/register', async(req, res) =>{
    const {name, email, password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(userDoc);
    }
    catch(e){
        res.status(422).json(e);
    }
    
});

app.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email}) 
    if(userDoc){
        const validPassword = bcrypt.compareSync(password, userDoc.password);
        if(validPassword){
            // creating cookie to store user information
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        }
        else{
            res.status(422).json("password not good :(")
        }
    }
    else{
        res.json('User not found');
    }

});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) =>{
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        })
        // bcrypt.decodeBase64({token}, 10)
    }
    else{
        res.json(null);
    }
    
})

app.post('/logout', (req,res) =>{
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    console.log(`received request body: ${req.body}`);
    const newName = "photo" + Date.now() + ".jpg"
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    });
    res.json(newName);


})

const photosMiddleware = multer({dest:"uploads/"});
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for(let i = 0; i < req.files.length; i += 1){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    console.log(uploadedFiles)
    res.json(uploadedFiles);
})

app.post('/places', (req, res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) =>{
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, 
            address, 
            photos: addedPhotos, 
            description, 
            perks, 
            extraInfo, 
            checkIn, 
            checkOut,
            price
        });
        res.json(placeDoc);
        
    });  
})

app.get('/user-places', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) =>{
        if (err) throw err;
        const {id} = userData;
        res.json( await Place.find({owner:id}) );
    });

})

app.get('/places/:id', async (req,res) => {
    const id = req.params.id;
    res.json(await Place.findById(id));
})

app.put('/places', async (req,res) => {
    const {token} = req.cookies;
    const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, price} = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) =>{
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,
                address,
                photos:addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                price
            })
            placeDoc.save();
            res.json('ok');
        }
    })
});

app.get('/places', async (req,res) => {
    res.json(await Place.find());
})

app.listen(4000);