
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import sendEmail from '../services/emailService.js';

// Generate Random password


const generateRandomPass = (length = 10) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!#$&";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
};

// Register a new user
export const register = async (req, res) => {
    try {
        const { name, email ,role,age,description} = req.body;
        if (!name || !email || !role || !age || !description) {
            return res.status(400).json({ message: 'Not all fields have been entered.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'An account with this email already exists.' });
        }
       
        const generatePass=generateRandomPass(10);
        const passwordHash = await bcrypt.hash(generatePass, 10);

           const savedRoles=await User.create({
         role,
         name,
         age,
         email,
         password:passwordHash,
         description
   }) 
   await sendEmail({
    to:email,
    subject:"Your account password",
    html:`<h1>Hello ${name}</h1>
          <p>Your account has been created</p>
          <p>Email: ${email}</p>
          <p>Password: ${generatePass}</p>
          `
   })
   res.status(201).json(savedRoles)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ message: 'Not all fields have been entered.' });
        }

        const user = await User.findOne({ email });
        console.log("user", user)
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: user._id },             // payload (data you want to store) 
            process.env.JWT_SECRET,    // secret key
            { expiresIn: "1d" }
        );
        res.json({
            token,
            user: {
                user: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        }
        )

        res.status(200).json({
            message: "Login successful",
            user
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const getRoles = async (req, res) => {
    try {
        const users = await User.find(); // fetch all users
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRolesById = async (req, res) => {
    const {id}=req.params
    try {
        const users = await User.findById(id); // fetch all users
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const editUser = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email, role, age, description } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                role,
                age,
                description
            },
            { new: true } // returns updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const deleteUser=async(req,res)=>{
   try{
       const role=await User.findByIdAndDelete(req.params.id)
       res.status(200).json({message:"Delete successfully"})
   }

   catch(error){
     res.status(500).json({message:error.message})
   }
}


