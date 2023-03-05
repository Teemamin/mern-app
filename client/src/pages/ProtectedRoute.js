import { Navigate ,redirect} from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();

  if (userLoading) return <Loading />; //if we are fetching the current user, display the loader
  
  if (!user) {
    return <Navigate to='/landing' />;// if there is no user, kick them out
  }
  return children; // else display the protected routes
};


export default ProtectedRoute