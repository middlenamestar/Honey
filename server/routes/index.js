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
    signUpUser
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
        const newPromise =new Promise((resolve,reject) => {
            const insertedUser = signUpUser(data)
        })
        let token 
        newPromise.then( () => {
            console.log(insertedUser)
            token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60*24,
        })}
        )
        res.status(201).json({token, userId: generatedUserID, email:sanitizedEmail}) 
    }
})




   }catch(err){
       console.log(err)
   }
})

router.route('/users').get(getUsers)

//---------------------End of SignUp-----------------------------






















module.exports = router;
