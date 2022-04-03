const router = require('express').Router();
const apiRoutes = require('./api');
const {v4:uuidv4}= require('uuid')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    checkExist,
    signUpUser,
    logInUser,
    onBoarding
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













module.exports = router;
