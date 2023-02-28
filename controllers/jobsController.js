import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment'


const createJob = async (req,res,next)=>{
    const {company,position} = req.body
    if(!company || !position){
        throw new BadRequestError('Please Provide All Values')
    }
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    // console.log(job)
    return res.status(StatusCodes.CREATED).json({job})
}

const deleteJob = async (req,res,next)=>{
    //find the job,check if the ojb ex, check permison, delete
    const { id: jobId } = req.params;
    const job = await Job.findOne({_id: jobId})

    if(!job){
        throw new NotFoundError(`no job with the ${jobId} found`)
    }
    checkPermissions(req.user,job.createdBy)
    await job.remove()

    return res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
}

const getAllJobs = async (req,res,next)=>{
    const {search, status, jobType, sort } = req.query
    const queryObject = {
         createdBy: req.user.userId
        }
    //add stuff based on condition
    //if status is !all, find will get all the jobs else it will filter the jobs by the status(pending etc)
    if(status && status !== 'all'){
        queryObject.status = status
    }
    if(jobType && jobType !== 'all'){
        queryObject.jobType = jobType
    }

    if(search){
        queryObject.position = { $regex: search, $options: 'i' } //mongoDB syntax: passing i to options to make it case insensitive,using regex ensure we search based on the "search"frm frntend
        //with this we get d jobs > positions that contains what the user passed as "search"
    }

    let result = Job.find(queryObject) // NO AWAIT,with await u immediately get the result,if no await u get back the query,then u can chain stuff

     // chain sort conditions
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('position');
    }
    if (sort === 'z-a') {
        result = result.sort('-position');
    } 

     // setup pagination, the skip() and limit() methods are coming from mongoose
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10 //our frontend setup is not sending the limit,so the default 10 will be used
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    // for 71 job eg
    // 10 10 10 10 10 10 10 1 no of jobs per page

    const jobs = await result
    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);
    return res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages })
}
const updateJob = async (req,res,next)=>{
    // console.log(req.params.id)
    const  jobId = req.params.id
    const {company,position} = req.body
    if(!company || !position){
        throw new BadRequestError('Please Provide All Values')
    }
    const job = await Job.findById({_id: jobId})
    if(!job){
        throw new NotFoundError(`no job with the ${jobId} found`)
    }

    //check permissions
    checkPermissions(req.user, job.createdBy) // passing the entire user object
    //if you have model hooks use the alternative .save() (see readme) findOneAndUpdate doesnt trigger model hooks
    const updatedJob = await Job.findOneAndUpdate({_id:jobId}, req.body, {
        new: true,
        runValidators: true
        //runValidators, will only run validation on the data added inside the findoneandupdate call
        //this validation onl runs on the provided properties
    })
    return res.status(StatusCodes.OK).json({updatedJob})
}
const showStats = async (req,res,next)=>{
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);
    //   console.log(stats)
   stats = stats.reduce((acc,curr)=>{
        let {_id,count} = curr
        acc[_id] = count
        return acc
    },{})

    const defaultStats = {//adding defaultStatts incase the user doesnt have any jobs created yet,you can send the stats alone if you handle the user not havn jobs in frontend
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
      };
      let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        {
          $group: {
            _id: {
              year: {
                $year: '$createdAt',
              },
              month: {
                $month: '$createdAt',
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } }, //get the lattest 6 months
        { $limit: 6 },
      ]);

      monthlyApplications = monthlyApplications
        .map((item) => {
            const {
            _id: { year, month }, // pulling out the year n month from the nested objct
            count,
            } = item;
            //moment accepts 0-11 while mongodb is 1-12,the below ensures it is the same as the mongo format
            const date = moment()
            .month(month - 1)
            .year(year)
            .format('MMM Y');
            return { date, count };
        })
        .reverse();
    
      res.status(StatusCodes.OK).json({ defaultStats,monthlyApplications });
}





export { createJob, deleteJob, getAllJobs, updateJob, showStats };