import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        let profilPhotoUrl = "";
        // Vérifier la présence du fichier avant d'essayer de le traiter
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);  // Utiliser la fonction getDataUri pour traiter le fichier
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                profilPhotoUrl = cloudResponse.secure_url;
            } catch (uploadError) {
                return res.status(500).json({
                    message: "File upload failed: " + uploadError.message,
                    success: false
                });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user account
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilPhoto: profilPhotoUrl
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error during register:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        };

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        };

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

      return res.status(200)
      .cookie("token", token, {
        httpOnly: true,           // Secure cookie that cannot be accessed via JavaScript
        secure: true,             // Ensure your backend is in HTTPS when using this
        sameSite: "None",         // To allow cookies to be sent across different domains (e.g., Vercel to Render)
        maxAge: 1 * 24 * 60 * 60 * 1000, // Token expiration in 1 day
        path: '/',                // Path where the cookie is available
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
        token: token,  // Send the token in the response body as well
      });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // Middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Update basic profile information
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Check if there's a file upload for profile photo
        if (req.files && req.files.profilPhoto) {
            const profilPhoto = req.files.profilPhoto[0]; // Assuming profilPhoto is uploaded as a field
            const profilPhotoUri = getDataUri(profilPhoto);
            const profilPhotoCloudResponse = await cloudinary.uploader.upload(profilPhotoUri.content);

            // Save the new profile photo URL
            user.profile.profilPhoto = profilPhotoCloudResponse.secure_url;
            user.profile.photoOriginalName = profilPhoto.originalname;
        }

        // Check if there's a file upload for resume
        if (req.files && req.files.resume) {
            const resume = req.files.resume[0]; // Assuming resume is uploaded as a field
            const resumeUri = getDataUri(resume);
            const resumeCloudResponse = await cloudinary.uploader.upload(resumeUri.content);

            // Save the new resume URL
            user.profile.resume = resumeCloudResponse.secure_url;
            user.profile.resumeOriginalName = resume.originalname;
        }

        // Save the updated user profile data
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

