import * as React from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products/:id",
    element: <SingleProduct />,
  }
]);

function App() {

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App