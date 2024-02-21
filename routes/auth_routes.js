const jwt =require( 'jsonwebtoken');
const bcrypt =require( 'bcrypt');
const Student=require('../models/student');
const Admin=require('../models/admin');
const Login_History = require('../models/logging');

const LoginApi=('/login', async (req, res) => {
  try {
    const { id, password,user } = req.body;
   
    if(user==='Student')
    {
  await Student.findByPk(id).then(async(data)=>{
        if(!data) return res.status(401).json({error:"rollno is incorrect"});
        else
        {
            const validPassword = await bcrypt.compare(password, data.dataValues.studentpassword);
            if (!validPassword) return res.status(401).json({error: "Incorrect password"});

        //JWT
    const student =data.dataValues;
    Login_History.create({studentid:student.studentid})

const tokens=jwt.sign({ userId: student.studentid }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '2m',
      });
      const Refreshtokens = jwt.sign({ userId: student.studentid }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
        });

    //res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none'});
    return res
    .cookie("access_token", {tokens,Refreshtokens}, {
      httpOnly: true,
      secure: false,
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });
        }

    });}
    else if(user==='Admin')
    {   

    await Admin.findByPk(id).then(async(data)=>{
        if(!data) return res.status(401).json({error:"rollno is incorrect"});
        else
        {     

            const validPassword = await bcrypt.compare(password, data.dataValues.adminpassword);
            if (!validPassword) return res.status(401).json({error: "Incorrect password"});

        //JWT
    const admin =data.dataValues;
    const tokens= jwt.sign({ userId: admin.adminid }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
      });
      const Refreshtokens = jwt.sign({ userId: admin.adminid }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
        });
      console.log({tokens});
    //res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none'});
    return res
    .cookie("access_token", {tokens,Refreshtokens}, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });
}});
      }
       else{
        throw {message:"not a valid user"};}
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
