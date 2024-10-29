import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Vérification des champs manquants
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Vérification que salary et experience sont des nombres
        if (isNaN(salary) || isNaN(experience)) {
            return res.status(400).json({
                message: "Salary and experience must be numbers.",
                success: false
            });
        }

        // Création de l'offre d'emploi
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),  // Conversion du salaire en nombre
            location,
            jobType,
            experienceLevel: Number(experience),  // Conversion de l'expérience en nombre
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while creating the job.",
            success: false
        });
    }
};

// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const jobId = req.params.id; // Assuming the job ID is passed in the URL params

        // Find the job by ID
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Update only fields that are provided in the request
        if (title) job.title = title;
        if (description) job.description = description;
        if (requirements) job.requirements = requirements.split(",");
        if (salary) job.salary = Number(salary);
        if (location) job.location = location;
        if (jobType) job.jobType = jobType;
        if (experience) job.experienceLevel = experience;
        if (position) job.position = position;
        if (companyId) job.company = companyId;

        // Save the updated job
        await job.save();

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while updating the job.",
            success: false
        });
    }
};
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id; // Assuming the job ID is passed in the URL params

        // Find and delete the job by ID
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while deleting the job.",
            success: false
        });
    }
};
export const saveJob = async (req, res) => {
    try {
        const userId = req.id; // Extract user ID from the request
        const jobId = req.params.id; // Extract job ID from the request parameters
        if (!userId) {
            return res.status(401).json({
                message: "User is not authenticated.",
                success: false
            });
        }
        // Check if job ID is provided
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Check if the job is already saved by the user
        const existingSavedJob = await Job.findOne({ _id: jobId, savedBy: userId });
        if (existingSavedJob) {
            return res.status(400).json({
                message: "Job is already saved.",
                success: false
            });
        }

        // Save the job for the user by updating the savedBy array
        job.savedBy.push(userId); // Add the user ID to the savedBy array
        await job.save(); // Save the updated job document

        return res.status(201).json({
            message: "Job saved successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while saving the job.",
            success: false
        });
    }
};



// Function to get saved jobs (similar to getAppliedJobs)
