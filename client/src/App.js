import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Error,Register,Dashboard } from "./pages";
import Landing from "./pages/Landing";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <RootLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>,
      },
      {
        path: 'dashboard',
        element: <Dashboard/>,
      },
      {
        path: 'register',
        element: <Register/>,
      },
    ]
  },
  
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
