 const Logout= (req, res) => {
console.log(req);
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  };

  module.exports={Logout};