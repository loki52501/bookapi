const express =require( 'express');
const jwt =require( 'jsonwebtoken');
const pool =require( '../config/db');
const bcrypt =require( 'bcrypt');
const Student=require('../models/student');

const LoginApi=('/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    const students = await Student.findByPk(id).then(async(data)=>{
        if(!data) return res.status(401).json({error:"rollno is incorrect"});
        else
        {
            const validPassword = await bcrypt.compare(password, data.dataValues.studentpassword);
            if (!validPassword) return res.status(401).json({error: "Incorrect password"});

        //JWT
    const student =data.dataValues;
 console.log(process.env.ACCESS_TOKEN_SECRET);
    const tokens = jwt.sign({ userId: student.studentid }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
      });
      console.log({tokens});
    //res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none'});
    res.status(200).json({tokens});
        }

    });
   
 
     
    
    //res.render('dashboard');
    //res.redirect("/api/auth/dashboard");
    // return res.redirect("/api/auth/dashboard");
  } catch (error) {
    res.status(401).json({error: error.message});
  } 
});


/*router.get('/refresh_token', (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({error:error.message});
      let tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none'});
      return res.json(tokens);
    });
  } catch (error) {
    res.status(401).json({error: error.message});
  }
});

router.get('/token', (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if(refreshToken == null) return res.sendStatus(401);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({error:error.message});
    const accessToken = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'});
    res.setHeader('Authorization', accessToken);
    res.json({accessToken: accessToken});
  });
})

router.delete('/refresh_token', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({message:'Refresh token deleted.'});
  } catch (error) {
    res.status(401).json({error: error.message});
  }
});*/

module.exports={LoginApi};
