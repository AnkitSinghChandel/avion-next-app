import Image from "next/image";

const FirstHome = () => {
  return (
    <div>
      {/* <Image
        className="dark:invert"
        src="/next.svg"
        alt="logo"
        width={100}
        height={20}
        priority
      /> */}
      <section className="bg-[url(https://imgh.in/host/x3et9a)] bg-cove-r bg-center bg-no-repea-t h-screen w-full overflow-y-auto bg-fixed">
        <div className="flex flex-col justify-center items-start h-full min-h-screen p-8 md:p-24 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <span className="text-amber-400 font-semibold tracking-widest text-sm uppercase mb-3 block">
            Modern Architecture & Luxury Living
          </span>

          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
            WE BUILD THE <br />
            <span className="text-amber-400">FUTURE SKYLINE</span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-xl font-light leading-relaxed mb-8">
            We design sustainable, high-end commercial spaces and luxury
            residential towers. Crafting iconic structures with world-class
            engineering since 1995.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded transition duration-300 shadow-lg uppercase tracking-wider">
              Our Projects
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded transition duration-300 uppercase tracking-wider">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col justify-center items-start h-full min-h-screen p-8 md:p-24 bg-gradient-to-r from-[#614E43]/90 via-[#614E43]/60 to-transparent">
        <span className="text-[#FBF6F0] font-semibold tracking-widest text-sm uppercase mb-3 block opacity-90 border-b border-[#D2C6BC]/30 pb-2">
          Premium Architectural Solutions
        </span>

        <h1 className="text-4xl md:text-7xl font-black text-[#FBF6F0] tracking-tight leading-none mb-6 uppercase">
          We Build The <br />
          <span className="text-amber-200/90 font-serif italic font-normal lowercase">
            future
          </span>{" "}
          Skyline
        </h1>

        <p className="text-base md:text-xl text-[#FBF6F0]/80 max-w-xl font-light leading-relaxed mb-8">
          Designing sustainable workspaces and luxury infrastructures.
          Seamlessly integrating modern engineering with your enterprise
          ecosystem.
        </p>

        <div className="flex flex-wrap gap-4">
          {/* Primary Button - Dashboard ke Update User jaisa Deep Brown */}
          <button className="bg-[#614E43] text-[#FBF6F0] hover:bg-[#4E3E35] border border-[#614E43] font-semibold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded-xl transition duration-300 shadow-md uppercase tracking-wider">
            View Dashboard
          </button>

          {/* Secondary Button - Dashboard ke Cancel button jaisa Cream/White */}
          <button className="bg-[#FBF6F0] text-[#614E43] hover:bg-[#F3EFE9] border border-[#D2C6BC] font-semibold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded-xl transition duration-300 shadow-sm uppercase tracking-wider">
            Manage Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstHome;
