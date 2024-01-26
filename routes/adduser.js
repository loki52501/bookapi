const Student =require( "../models/student");
const bcrypt =require( 'bcrypt');

const CreateStudent= async (req, res) => {
   console.log(req.body);
   const student=req.body;
  
    student.studentpassword=await bcrypt.hash(student.studentpassword,10);;
    await Student.create(student);
    res.json(student);
  };
  const getStudent= async (req, res) => {
    const student = await Student.findAll();
    res.json(student);
  };

 const getStudentById=async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
  console.log(student)
    res.json(student);
  }; 
 const updateStudent= async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
  
    await Student.update(req.body);
  
    res.json(student);
  };
  
  const deleteStudent= async (req, res) => {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
  
    await Student.destroy();
  
    res.json({ message: 'Student deleted successfully' });
  };
module.exports={ CreateStudent, getStudent,getStudentById,updateStudent,deleteStudent};