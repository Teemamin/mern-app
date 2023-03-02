import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Alert from './Alert'
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const { getAllJobs, jobs, isLoading, page, totalJobs,search,
    searchStatus,
    searchType,
    sort,numOfPages,showAlert } = useAppContext();
  useEffect(() => {
    const delaySearch = setTimeout(() => {//added timeout to delay the search req to the server,to allow user some time to type something meaningful
      //  instead of adding the eslint ignore warning below, you can use useCallback, was getting dependency warning to add getAllJobs to the array but
      //since we are changing state in the function, that will cause infinate loop
      getAllJobs();
    }, 400);
    return()=>{
      clearTimeout(delaySearch)
    }
    // eslint-disable-next-line
  }, [search,searchStatus,searchType,sort,page]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {showAlert && <Alert/>}
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}

export default JobsContainer