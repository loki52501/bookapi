const jwt =require( 'jsonwebtoken');

function AuthenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  console.log(token)
  if(token===undefined) return res.status(500).json({error:"you are not allowed here"})
  else if (token.tokens === undefined) return res.status(401).json({error:"Null token"});
  console.log("Auth1 Done");
  console.log("token1: ", token.Refreshtokens);
  jwt.verify(token.tokens, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      if(token.Refreshtokens)
      {
        jwt.verify(token.Refreshtokens,process.env.ACCESS_TOKEN_SECRET,(error,user)=>{
          if(error)  return res.status(403).json({error : error.message});
        const tk=jwt.sign({userId:user.userId},process.env.ACCESS_TOKEN_SECRET,{
          expiresIn: '2m',
          });
          token.tokens=tk;
          console.log(token)
          res.cookie('access_token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });
        })
      }
    }//req.user = user;
    console.log("Auth2 Done");
    next();
  });
}

const renew = (req, res, next) =>{
    const refreshToken = req.cookies.refresh_token;
    console.log("RefreshToken: ",refreshToken);
    if(refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({error:error.message});
      // const accessToken = jwtTokens(user).accessToken;
      // console.log("Curr: ",accessToken)
      const accessToken = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'});
      console.log("Curr: ",accessToken)
      // res.setHeader('authorization', accessToken);
      req.headers.authorization = `Bearer ${accessToken}`;
    });
    console.log("ENsd");
    next();
}

module.exports= {AuthenticateToken, renew};