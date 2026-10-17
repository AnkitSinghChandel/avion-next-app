// npm i html5-qrcode
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Tooltip } from "antd";
import { ArrowLeftOutlined, SyncOutlined } from "@ant-design/icons";
import { Camera, ShieldCheck, ScanLine } from "lucide-react";
import "./Scanner.css";
import { fetchAllUsers } from "../../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import toast from "../../components/notification/CustomToast";

const Scanner = () => {
  const navigate = useNavigate();
  const scannedRef = useRef(false);

  // BAR-87bfaec3   -> User Profile
  // QR-team123     -> Team Details
  // PRD-5566       -> Product Details

  // start mapping
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [allUserIds, setAllUserIds] = useState([]);
  useEffect(() => {
    dispatch(fetchAllUsers())
      .then((res) => {
        let allData = res?.data;
        setAllUserIds(allData.map((x) => x?.userId));
      })
      .catch(() => {
        toast.error({
          description: "Failed to load users.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // end mapping

  const unlockScanner = () => {
    setTimeout(() => {
      scannedRef.current = false;
    }, 3000);
  };

  useEffect(() => {
    if (!allUserIds.length) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.QR_CODE,
        ],
      },
      false,
    );

    const onScanSuccess = async (decodedText) => {
      // Same barcode multiple times scan hone se bachane ke liye use ref.
      if (scannedRef.current) return;

      scannedRef.current = true;

      try {
        console.log("Scanned:", decodedText);

        if (decodedText.startsWith("BC")) {
          const id = decodedText.slice(2);
          // navigate(`/profile/${id}`);
          // navigate(`/profile/${id}?mode=scanner`);

          let matchedUsers = allUserIds?.find((x) => x.startsWith(id));
          if (matchedUsers) {
            await scanner.clear(); // stop camera only when success confirmed
            navigate(`/profile/${matchedUsers}?mode=scanner`);
          } else {
            toast.error({
              key: "invalid-code",
              description:
                "Invalid barcode or user not found. Please scan again.",
            });
            unlockScanner();
          }
          return;
        }

        if (decodedText.startsWith("QR")) {
          const teamId = decodedText.slice(2);
          // navigate(`/teams/${teamId}`);
          unlockScanner();
          return;
        }

        toast.error({
          description: "The scanned barcode is not associated with Avion.",
        });
        unlockScanner();
      } catch (error) {
        // console.log(error);
        toast.error({
          description: "Something went wrong.",
        });
        unlockScanner();
      }
    };

    const onScanFailure = (error) => {
      console.log(error);
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch(() => {
        // console.log("Scanner cleanup failed");
      });
    };
  }, [navigate, allUserIds]);

  return (
    <>
      {/* <div className="p-4">
        <h2>Scan Barcode</h2>
        <div id="reader" />
      </div> */}

      {/* my custom ui */}
      <div className="bg-slate-50 p-0 sm:p-5">
        <div className="mx-auto">
          <div className="flex gap-4 items-center p-5 pb-0 sm:p-0">
            <h1 className="text-xl font-semibold text-[#8d7b68]">
              Scan Barcode
            </h1>
            <Tooltip title="Back">
              <ArrowLeftOutlined
                className="bg-(--badge-bg) rounded-[50%] shadow-lg p-2"
                style={{ color: "white", fontSize: "16px" }}
                onClick={() => {
                  navigate(-1);
                }}
              />
            </Tooltip>

            <Tooltip title="Refresh">
              <SyncOutlined
                className="ms-auto text-[18px]"
                onClick={() => {
                  window.location.reload();
                }}
              />
            </Tooltip>
          </div>

          <p className="text-[#8d7b68] mt-2 ps-5 sm:p-0">
            Scan a user barcode to view profile details
          </p>

          <div className="grid lg:grid-cols-2 gap-8 my-8 2xl:my-25 bg-white rounded-3xl shadow-(--google-shadow) p-8">
            {/* Left Side */}
            <div className="lg:border-r lg:pr-8 order-2 lg:order-1">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                  <ScanLine size={40} className="text-slate-700" />
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-8">How it works</h2>

              <div className="space-y-6 mt-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Camera />
                  </div>

                  <div>
                    <h3 className="font-semibold">Allow Camera Access</h3>
                    <p className="text-slate-500 text-sm">
                      Grant camera permission to start scanning.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <ScanLine />
                  </div>

                  <div>
                    <h3 className="font-semibold">Scan Barcode</h3>
                    <p className="text-slate-500 text-sm">
                      Keep barcode inside the scanner frame.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <ShieldCheck />
                  </div>

                  <div>
                    <h3 className="font-semibold">View User Details</h3>
                    <p className="text-slate-500 text-sm">
                      User profile opens automatically after scan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col order-1 lg:order-2">
              <div className="bg-slate-50 border rounded-2xl p-4">
                {loading && (
                  <p className="text-center">
                    Please wait ... &nbsp; <SyncOutlined spin />
                  </p>
                )}
                <div id="reader" />
              </div>

              <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-green-600" />
                  <span className="text-green-700 font-medium">
                    Secure Scanning
                  </span>
                </div>

                <p className="text-green-600 text-sm mt-2">
                  Camera is only used to scan barcodes and is never stored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scanner;
