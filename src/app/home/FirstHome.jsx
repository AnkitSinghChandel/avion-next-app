"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "antd";
const { TextArea } = Input;
import {
  SyncOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  CloseCircleFilled,
} from "@ant-design/icons";
import gearIcon from "@/src/assets/loader/gear-spinner.svg";
import closeIcon from "@/src/assets/icons/close-circle.svg";
import Aviation from "@/src/assets/images/Aviation.webp";
import Airport from "@/src/assets/images/Airport.webp";
import Residential from "@/src/assets/images/Residential.webp";
import Farmhouses from "@/src/assets/images/Farmhouses.webp";
import Resorts from "@/src/assets/images/Resorts.webp";
import FlightStatus from "@/src/assets/images/Flight-Status.webp";
import Cruises from "@/src/assets/images/Cruises.webp";
import axios from "axios";
import { singleUploadToS3 } from "@/src/redux/actions/commonAction";
import { useSelector, useDispatch } from "react-redux";
import toast from "@/src/components/notification/CustomToast";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
  });
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const div1Style = {
    backgroundColor: "red",
    padding: "20px",
  };
  const div2Style = {
    backgroundColor: "red",
    padding: "20px",
  };

  const handleSendInquiry = async () => {
    // router.push("/login");
    setShowContact(false);
    toast.info({
      // description: `Sending your enquiry... Please wait.`,
      description: (
        <div className="flex gap-2">
          <span>Sending your enquiry... Please wait.</span>
          <SyncOutlined spin />
        </div>
      ),
      key: "Enquiry",
      duration: 0,
    });
    await axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        name: "Ankit",
        email: "ankit@gmail.com",
        // incode: "#".repeat(10000000), // 10 MB
        incode: "#".repeat(10000000), // 10 MB
      })
      .then((res) => {
        localStorage.setItem(
          "sendInquiry",
          JSON.stringify({
            name: "Ankit Singh",
            number: "884035",
            email: "asc@gmail.com",
          }),
        );
      })
      .catch((eror) => {
        toast.error({
          description: `Failed to send enquiry. Please try again.`,
          key: "Enquiry",
        });
      });

    // await axios.post("api2", {
    //   userId: res1.data.id,
    // });

    // await axios.post("api3", {
    //   userId: res1.data.id,
    // });
  };

  // sab api ak ak krke run hogi qki await lga hai
  const handleSendInquiry2 = async () => {
    try {
      const res1 = await axios.post("api1", "payload1");
      const res2 = await axios.post("api2", "payload2");
      const res3 = await axios.post("api3", "payload3");
      console.log("All Done");
    } catch (err) {
      console.log(err);
    }
  };

  // sab api ak sath run hogi
  const handleSendInquiry3 = async () => {
    try {
      // agar sabhi ke res chahiye to...
      const [res1, res2, res3] = await Promise.all([
        axios.post("api1"),
        axios.post("api2"),
        axios.post("api3"),
      ]);

      // agar res nhi chahiye to...
      await Promise.all([
        axios.post("api1"),
        axios.post("api2"),
        axios.post("api3"),
      ]);
      console.log("All Done");
    } catch (err) {
      console.log(err);
    }
  };

  const ourProjectsData = [
    { title: "Aviation Services", img: Aviation },
    { title: "Airport Infrastructure", img: Airport },
    { title: "Luxury Residential Towers", img: Residential },
    { title: "Villas & Farmhouses", img: Farmhouses },
    { title: "Hotels & Resorts", img: Resorts },
    { title: "Flight Status", img: FlightStatus },
    { title: "Cruises", img: Cruises },
  ];

  return (
    <div>
      {/* bg-[url('/img11.jpg')] */}
      {/* bg-[url(https://imgh.in/host/x3et9a)] */}
      <section className="bg--[url('/img11.webp')] bg-cover bg-center bg-no-repeat min-h-screen w-full overflow-y-auto bg-fixed">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/frame.jpg"
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/myvideo.mov" type="video/mp4" />
        </video>
        <div className="flex flex-col md:justify-center items-start h-full min-h-screen p-8 pt-20 md:p-24 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm tracking-[2px] uppercase backdrop-blur-md mb-8">
            ✦ Trusted Since 1995
          </div>

          <span className="text-amber-400 font-semibold tracking-widest text-[16px] uppercase mb-3 block">
            Modern Architecture & Luxury Living
          </span>

          {/* Scroll Indicator */}
          {/* <div className="absolute bottom-8 left-[60%] -translate-x-1/2 text-white animate-bounce">
            ↓ Scroll
          </div> */}

          <div className="absolute bottom-3 left-[60%] -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-[4px] mb-2">
              Scroll
            </span>

            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-400 rounded-full mt-2"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
            WE BUILD THE <br />
            <span className="text-amber-400">FUTURE SKYLINE</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed mb-10">
            From luxury developments and commercial landmarks to aviation
            services and world-class excellence, we create experiences that
            define the future.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="border border-[#A37A32] text-[#ffff] bg-[#A37A32] hover:bg-[#C29645] hover:text-white font-bold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded-full transition duration-300 uppercase tracking-wider w-full sm:w-auto"
              // onClick={() =>
              //   document
              //     .getElementById("projects-section")
              //     ?.scrollIntoView({ behavior: "smooth" })
              // }
              onClick={() => setShowProjects(true)}
            >
              Our Projects
            </button>
            <button
              className="border border-white text-white hover:bg-white hover:text-black font-bold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base rounded-full transition duration-300 uppercase tracking-wider w-full sm:w-auto cursor-not-allowe_d"
              onClick={() => setShowContact(true)}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {showProjects && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="min-h-screen px-6 py-12">
            <div className="w-full mx-auto">
              {/* Header */}
              <div className="flex justify-between items-baseline mb-12">
                <div>
                  <span className="text-amber-400 uppercase tracking-[4px] text-sm font-semibold">
                    Our Projects
                  </span>

                  <h2 className="text-4xl font-bold text-white mt-4">
                    Excellence Across Industries
                  </h2>
                </div>

                <button
                  onClick={() => setShowProjects(false)}
                  className="text-white text-3xl hover:text-amber-400 pointer"
                >
                  <CloseCircleTwoTone twoToneColor="#0B1120" />
                </button>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ourProjectsData.map((item) => (
                  <div
                    key={item.title}
                    className="relative overflow-hidden rounded-3xl h-[180p-x] group cursor-pointer"
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Title */}
                    <h3 className="absolute bottom-3 left-5 text-white text-lg font-semibold z-10">
                      {item.title}
                    </h3>
                  </div>
                ))}

                <div
                  onClick={() => router.push("/login")}
                  className="cursor-pointer bg-amber-400 text-black rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <div className="flex gap-2">
                    <Image src={gearIcon} width={30} alt="" />
                    <p className="text-xl font-bold">Ongoing Projects</p>
                  </div>

                  <p className="mt-3 text-black">
                    Click to access ongoing project details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showContact && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B1120] w-full max-w-2xl rounded-3xl border border-white/10 p-8 relative">
            <span className="text-amber-400 uppercase tracking-[4px] text-sm">
              Get In Touch
            </span>

            <button
              onClick={() => setShowContact(false)}
              className="absolute top-5.5 right-5 text-white text-3xl hover:text-amber-400 pointer"
            >
              {/* <img src={closeIcon} alt="" width={25} /> */}
              <CloseCircleTwoTone twoToneColor="#0B1120" />
              {/* <CloseCircleFilled style={{ color: "gray" }} /> */}
            </button>

            <h2 className="text-white text-xl font-semibold mt-3 mb-8">
              Contact Us
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none"
                value={formData.fullName}
                onChange={handleChange}
              />

              <input
                type="number"
                name="number"
                placeholder="Phone Number"
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none"
                value={formData.number}
                onChange={handleChange}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none w-full mt-4"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              rows={5}
              placeholder="Tell us about your project..."
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none w-full mt-4 hidden"
            />

            <TextArea
              placeholder="Tell us about your project..."
              // autoSize
              autoSize={{ minRows: 3, maxRows: 6 }}
              showCount
              maxLength={100}
              classNames={{
                textarea:
                  "placeholder:text-[#9c8b7b]! placeholder:opacity-70! placeholder:font-semibold! placeholder:text-[14px]!",
                count: "text-white!",
              }}
              className="bg-white/5! border! border-white/10! rounded-xl p-4 text-white! text-[16px]! outline-none! w-full mt-4"
            />

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                className="bg-[#A37A32] hover:bg-[#C29645] text-white rounded-xl transition duration-300 px-8 py-3 w-full md:w-auto pointer ascButton"
                disabled={
                  !formData.fullName.trim() ||
                  !formData.email ||
                  !formData.number
                }
                onClick={handleSendInquiry}
              >
                Send Inquiry
              </button>

              <button
                onClick={() => {
                  // window.open("https://wa.me/918840356006", "_blank");
                  window.open(
                    "https://wa.me/918840356006?text=Hello, I would like to know more about your services.",
                    "_blank",
                  );
                }}
                className="border border-white/20 text-white px-8 py-3 rounded-xl w-full md:w-auto pointer"
              >
                WhatsApp
              </button>

              <button
                onClick={() => {
                  setFormData({
                    fullName: "",
                    email: "",
                    number: "",
                  });
                }}
                className="border border-white/20 text-white px-8 py-3 rounded-xl w-full md:w-auto min-w-[150px] pointer"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Side Card Start */}
      <div className="bg-[#0B1120] py-8 px-6 min-h-screen">
        <div className="w-full mx-auto">
          <div className="text-center mb-10">
            <span className="text-amber-400 uppercase tracking-[4px] text-sm font-semibold">
              Our Achievements
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Building Excellence Since 1995
            </h2>

            <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
              Shaping the future through luxury developments, commercial
              landmarks, aviation services, and engineering excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 h-[130px]">
              <h3 className="text-5xl font-bold text-amber-400">250+</h3>
              <p className="text-gray-300 mt-3">Projects Delivered</p>
            </div>

            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 h-[130px]">
              <h3 className="text-5xl font-bold text-amber-400">30+</h3>
              <p className="text-gray-300 mt-3">Years Experience</p>
            </div>

            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 h-[130px]">
              <h3 className="text-5xl font-bold text-amber-400">1000+</h3>
              <p className="text-gray-300 mt-3">Expert Professionals</p>
            </div>

            <div className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 h-[130px]">
              <h3 className="text-5xl font-bold text-amber-400">15+</h3>
              <p className="text-gray-300 mt-3">Countries Served</p>
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-8">
              <h3 className="text-white text-2xl font-bold mb-4">
                Industries We Serve
              </h3>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-white/10 text-white text-[14px]">
                  Aviation Services
                </span>

                <span className="px-4 py-2 rounded-full bg-white/10 text-white text-[14px]">
                  Luxury Residential Towers
                </span>

                <span className="px-4 py-2 rounded-full bg-white/10 text-white text-[14px]">
                  Airport Infrastructure
                </span>

                <span className="px-4 py-2 rounded-full bg-white/10 text-white text-[14px]">
                  Villas & Farmhouses
                </span>

                <span className="px-4 py-2 rounded-full bg-white/10 text-white text-[14px]">
                  Hotels & Resorts
                </span>

                <span
                  id="projects-section"
                  className="px-4 py-2 rounded-full transition-all duration-300 bg-amber-400 cursor-pointer hover:scale-105 text-black text-[14px] font-medium"
                  onClick={() => router.push("/login")}
                >
                  Ongoing Projects
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-white text-2xl font-bold mb-4">
                Global Presence
              </h3>

              <p className="text-gray-300 leading-8">
                From luxury developments and commercial landmarks to aviation
                services and engineering excellence, we create innovative
                solutions that define the future.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Side Card End */}

      <div className="fle-x flex-col justify-center items-start h-full min-h-screen p-8 md:p-24 bg-gradient-to-r from-[#614E43]/90 via-[#614E43]/60 to-transparent hidden">
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

export default Home;
