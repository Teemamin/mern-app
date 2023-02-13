const createJob = async (req,res,next)=>{
    return res.send('createJob')
}

const deleteJob = async (req,res,next)=>{
    return res.send('deleteJob')
}

const getAllJobs = async (req,res,next)=>{
    return res.send('getAllJobs')
}
const updateJob = async (req,res,next)=>{
    return res.send('Updated')
}
const showStats = async (req,res,next)=>{
    return res.send('showStats')
}





export { createJob, deleteJob, getAllJobs, updateJob, showStats };