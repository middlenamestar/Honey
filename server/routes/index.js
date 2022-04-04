const router = require('express').Router();
const apiRoutes = require('./api');
const {v4:uuidv4}= require('uuid')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const axios =require('axios')
const {
    checkExist,
    signUpUser,
    logInUser,
    onBoarding,
    getUserInfo,
    ImageUpload
} = require('../controller/userController');
router.use('/api', apiRoutes);



//--------------------- SignUp Routes ------------------------
router.route('/signup').post(async(req,res) => {
   try{ 
    const {email,password} =req.body
    const sanitizedEmail = email.toLowerCase()
    const generatedUserID = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 11)

checkExist(sanitizedEmail).then((a)=>{
    if (a){
        return res.status(409).send('Email already in Use')
    } else{
        const data = {
            ManmadeID:generatedUserID,
            email:sanitizedEmail,
            password:hashedPassword
        }
        let token
        signUpUser(data).then((a)=>{
            token = jwt.sign(a.toJSON(), sanitizedEmail, {
            expiresIn: 60*24,})
        }).then(()=>{
            res.status(201).json({token, userId: generatedUserID})
        })
         
    }
})

   }catch(err){
       console.log(err)
   }
})
//---------------------End of SignUp-----------------------------



//--------------------- LogIn Routes ------------------------
router.route('/login').post(async(req,res) => {
    const {email,password} =req.body
    try{
        logInUser(req, res).then(async (user) => {
            const correctPassword = await bcrypt.compare(password, user.password) 
            if (user && correctPassword) {
                const token =jwt.sign(user.toJSON(),email, {
                    expiresIn:60*24
                })
                res.status(201).json({token, userId:user.ManmadeID})
            }else{
                res.status(400).send("Invalid Credentials")
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)});
    } catch (err) {
        console.log(err)
    }

})
//---------------------End of LogIn-----------------------------



//--------------------- UpdateUser Routes ------------------------
router.route('/user').put(async(req,res) => {
    const formData =req.body.formData
    try{
        onBoarding(req, res, formData);
    }catch(err){
        console.err(err)
    }
})
//---------------------End of UpdateUser-----------------------------

//--------------------- UpdateUserImage Routes ------------------------
router.route('/userImage').put(async(req,res) => {
    const imageURL=req.body.imageURL
    const userId = req.body.userId
    ImageUpload(req, res, imageURL, userId)
})
//---------------------End of UpdateUserImage-----------------------------



//--------------------- GetUser Routes ------------------------
router.route('/user').get(async(req,res) => {
    try {  
        getUserInfo(req,res)

    } catch (error) {
        console.log(error)
    }

})
//---------------------End of GetUser-----------------------------


//--------------------- GetUserAnime Routes ------------------------
router.route('/userAnime').get(async(req,res) => {
    const getMalData = async (req,res) =>{
        const ApiResponse = await axios.get(`https://api.myanimelist.net/v2/users/${req.query.malUser}/animelist?limit=100`,{
            headers: {
                'X-MAL-CLIENT-ID': '0969c704ebfcb780acbeb8f07e66e05d',
              }
        })
        res.send(ApiResponse.data.data)
    }
    try {  
        getMalData(req,res)

    } catch (error) {
        console.log(error)
    }

})


//---------------------End of GetUserAnime-----------------------------




module.exports = router;
