import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          {/*<img src={logo} className="w-28 object-contain" alt="logo" />*/}
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-extrabold tracking-wide text-black-500">Imagine<span className="text-blue-400">ZY</span></span>
        </Link>
        <div className="flex justify-between">
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md me-5"
          >
            Create
          </Link>
          <SignedOut>
            <SignInButton className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md" />
          </SignedOut>
          <SignedIn>
            <UserButton className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md" />
          </SignedIn>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
