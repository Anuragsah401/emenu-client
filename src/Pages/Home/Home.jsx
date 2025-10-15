import React from "react";
import { Link } from "react-router-dom";
import Title from "../../Components/UI/Title/Title";
import backgroundvideo from "Assets/Videos/video2.mp4";

const Home = () => {
  return (
    <div className="flex justify-between items-center w-full h-[100vh] text-center bg-[transparent] relative">
      <video
        autoPlay
        muted
        loop
        className="absolute flex justify-between items-center w-full h-[100vh] object-cover -z-50"
      >
        <source src={backgroundvideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <div className="w-full">
        <Title text="E-menu system" />
        <h1 className="font-Pacifico text-[2em] md:text-[5rem]">Hello Foodies!</h1>
        <Link to="/chooseuser" className="inline-block my-5">
          <button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
            <div class="absolute inset-0 w-3 bg-[#20CFBA] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span class="relative text-black group-hover:text-white">Get Started</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
