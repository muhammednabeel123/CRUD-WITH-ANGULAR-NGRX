const { Router } = require('express')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Admin = require('../models/admin')
const router = Router()

router.post('/register', upload.fields([{ name: 'file' }, { name: 'name' }, { name: 'email' }, { name: 'password' }]), async (req, res) => {
    console.log(req.files); // log the uploaded files to the console
    console.log(req.body); // log the form data to the console
  
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    if(req.file){
        let image = req.files.file[0].filename; 
    }
   
    // console.log(image)// get the path of the uploaded file
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const record = await User.findOne({ email: email });
  
    if (record) {
      return res.status(400).send({
        message: "email is already registered"
      });
    } else {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        image:req.files.file[0].filename
      });
  
      const result = await user.save();
  
      //JWT Token
      const { _id } = await result.toJSON();
      const token = jwt.sign({ _id: _id }, "secret");
      console.log(token, "this is token");
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });
  
      res.send({
        message: "success"
      });
    }
  });
  

router.post("/login",async(req,res) =>{
    const user = await User.findOne({email:req.body.email})
    console.log(user,"this is user")
    if(!user){
        return res.status(404).send({
            message:"User not found" 
        })
    }
    console.log("reaching here");
    if(!(await bcrypt.compare(req.body.password,user.password))){
        return res.status(404).send({
            message:"Password is Incorrect"
        })
    }
    console.log("reaching here now");

    const token = jwt.sign({_id:user._id},"secret")
    res.cookie("jwt", token ,{
        httpOnly:true,
        maxAge:24*60*60*1000 //day

    })
    res.send({
        message:"success"   
        
    })
} )


router.post("/login-admin",async(req,res) =>{
    console.log(req.body.email)
    const admin = await Admin.findOne({email:req.body.email})
    console.log(admin,"this is user")
    if(!admin){
        return res.status(404).send({
            message:"User not found" 
        })
    }
    console.log("reaching here");
    if((await (req.body.password != admin.password))){
        return res.status(404).send({
            message:"Password is Incorrect"
        })
    }
    console.log("reaching here now");

    const token = jwt.sign({_id:admin._id},"secret")
    res.cookie("jwt", token ,{
        httpOnly:true,
        maxAge:24*60*60*1000 //day

    })
    res.send({
        message:"success"   
        
    })
} )


router.post('/logout',(req,res)=>  {
    res.cookie("jwt"," ",{maxAge:0})
    res.send({
        message:"success"
    })

})

router.post('/logout-admin',(req,res)=>  {
    res.cookie("jwt"," ",{maxAge:0})
    res.send({
        message:"success"
    })

})


router.get('/user',async(req,res) => {
   
  try {
    const cookie = req.cookies['jwt']
   
    const claims = jwt.verify(cookie,"secret")
    console.log(claims,"this is claims")
   

    
    if(!claims){
        return res.status(401).send({
            message:"unauthenticated"
        })  
    }
    console.log("reaching here")
    const user = await User.findOne({

        _id:claims._id
    })
    console.log("also reaching here")
    console.log(user)
    const {password,...data} = user.toJSON()
    
    res.send(data)
   
    
  } catch (error) {
    return res.status(401).send({
        message:'unauthenticatwqw'
    })
  }

} )


router.get('/getUser',async(req,res)=>{
    try {
        const user = await User.find({})
        res.send( user )
        
    } catch (error) {
        console.log(error.message)
        
    }
})


router.delete('/deleteUser', async (req, res) => {
    try {
      const userId = req.query.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      console.log(deletedUser, 'deleted user');
      res.status(200).json(deletedUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: error.message });
    }
  });

router.get('/edit/:id',async(req,res)=>{
    console.log(req.params,"this",req.query)
    userId = req.params.id
    const user = await User.findOne({_id:userId})

    res.status(200).json({item:user})

})

router.put('/editUser/:id',async(req,res)=>{
    userId = req.params.id

    console.log(req.query,"this is params",req.params,req.body)
    const user = await User.findOneAndUpdate({_id:userId},{$set:{name:req.body.name,email:req.body.email}})
    res.status(200).json({item:user})
})


router.post('/profile-upload-single',upload.single('image'),async (req, res, next) => {
    console.log("nonnnnnnnnnnnn");
   console.log(req.file.filename+"fffffss");
   
     images=req.file.filename
 
    console.log(images);
     try {
         console.log("lodding");
          const cookie=req.cookies['jwt']
          const claims=jwt.verify(cookie,"secret")
          if(!claims){
              return res.status(401).send({
                  message:"UnAuthenticated"
              })
          }
          const updated = await User.updateOne({ _id: claims._id },{$set:{image:images}})
          const GettingUser = await User.findOne({ _id: claims._id })
          const {password,...data}=await GettingUser.toJSON()
          res.send(data)
      } catch (err) {
          return res.status(401).send({
              welcome:"UnAuthenticated" 
          })
      }
     });



    router.post('/register1',async(req,res)=>{
        console.log(req.body,"hey bodyy");
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const record = await User.findOne({ email: email });


        if (record) {
            return res.status(400).send({
              message: "email is already registered"
            });
          } else {
            const user = new User({
              name: name,
              email: email,
              password: hashedPassword,
            
            });
        
            const result = await user.save();
        
            //JWT Token
            const { _id } = await result.toJSON();
            const token = jwt.sign({ _id: _id }, "secret");
            console.log(token, "this is token");
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000
            });
        
            res.send({
              message: "success"
            });
          }

    })



module.exports = router 