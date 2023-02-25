import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Error,Register,ProtectedRoute } from "./pages";
import{AllJobs,AddJob,Profile,Stats,SharedLayout} from './pages/dashboard'
import Landing from "./pages/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><SharedLayout/></ProtectedRoute>,
    errorElement: <Error/>,

    children: [
      {
        index: true,
        element:  <Stats/>,
      },
      {
        path: 'stats',
        element:  <Stats/>,
      },
      {
        path: 'all-jobs',
        element:  <AllJobs/>,
      },
      {
        path: 'add-job',
        element:  <AddJob/>,
      },
      {
        path: 'profile',
        element:  <Profile/>,
      },
    ],
    
  },
  {
    path: '/landing',
    element: <Landing/>,
  },
  {
    path: '/register',
    element: <Register/>,
  },
  
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
