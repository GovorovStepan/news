import './App.css';
import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Error from './pages/Error';
import Profile from './pages/Profile';
import ArticleList from './pages/Articles/ArticleList';
import ProtectedLayout from './components/ProtectedLayout';
import HomeLayout from './components/HomeLayout';
import AuthLayout from './components/AuthLayout';
import Feed from './pages/Articles/Feed';
import Article from './pages/Articles/Article';

const router = createBrowserRouter(
  createRoutesFromElements(

    <React.Fragment>
      <Route
        element={<AuthLayout />}
        errorElement={<Error />}
      >
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/news" element={<ProtectedLayout />}>
          <Route path="" element={<ArticleList />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="article/:id" element={<Article />} />
        </Route>
      </Route>
    </React.Fragment>
  )
);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
