import { useAppContext } from "../../context/appContext"
import{JobsContainer, SearchContainer} from "../../components/index.js"

const AllJobs = () => {
 const {getAllJobs} = useAppContext()
  return (
    <>
      <SearchContainer/>
      <JobsContainer/>
    </>
  )
}

export default AllJobs