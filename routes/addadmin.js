const Admin =require( "../models/admin");
const bcrypt =require( 'bcrypt');
const CreateAdmin= async (req, res) => {
   console.log(req.body);
   const admin=req.body;
  console.log(admin)
    admin.adminpassword=await bcrypt.hash(admin.adminpassword,10);;
    await Admin.create(admin);
    res.json(Admin);
  };
  const getAdmin= async (req, res) => {
    const admin = await Admin.findAll();
    res.json(admin);
  };

 const getAdminById=async (req, res) => {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
  
    res.json(admin);
  };
  
  
 const updateAdmin= async (req, res) => {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
  
    await admin.update(req.body);
  
    res.json(admin);
  };
  
  const deleteAdmin= async (req, res) => {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
  
    await admin.destroy();
  
    res.json({ message: 'Admin deleted successfully' });
  };
module.exports={ CreateAdmin,getAdmin,getAdminById,updateAdmin,deleteAdmin};