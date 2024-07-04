import React, { useEffect, useRef, useState } from "react";
import classes from "./AllBill.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "firebase/firestore";
import { GetAllBills } from "./Get";
import Navigation from "../../../Header/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";
import DialogBoxContent from "./DialogBoxContent";
import PdfContent from "./PdfContent";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../Firebase";
import { getAuth } from "firebase/auth";
import ShopDataFetch from "./ShopDataFetch";

let currentUser = null;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AllBill = () => {
  // console.log(shopData)
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [medicineDialog, setMedicineDialog] = useState({
    visible: false,
    billIndex: 0,
  });
  // const [shopData, setShopData] = useState(null);
  const [showShopDetails, setShowShopDetails] = useState(false);
  const [userUid, setUserUid] = useState();
  const [shopData, setShopData] = useState(null);

// console.log("shopfetchdata fun citon is here")
//   useEffect(()=>{
//      <ShopDataFetch/>
//     const data=()=>{
//    console.log("shopfetch data se data aa rh ahai ")
//      }
//      data()
//    },[]
//   );   


  useEffect(() => {
    //function to fetch the authentication user's uid
    const fetchUserUid = () => {
      //get the currently authenticated user
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        setUserUid(user.uid);
        console.log(user.uid);
      }
    };
    fetchUserUid();
  }, []);

  useEffect(() => {
    async function fetchShopDetails() {
      try {
        if (userUid) {
          //   console.log(userUid)
          //use useruid as a filter to fetch the shop details for the current user
          const querySnapshot = await getDocs(
            query(collection(db, "ShopDetails"), where("UserID", "==", userUid))
          );

          const shopDetails = querySnapshot.docs.map((doc) => doc.data());
          // setShopData(shopDetails)
          console.log("shop details of currently logged in users", shopDetails);
          if (shopDetails.length > 0) {
            setShopData(shopDetails[0]); // Set the first shop detail from the array
            console.log(
              "shop details of currently logged in users",
              shopDetails[0]
            );
          } else {
            console.log("No shop details found for the current user.");
          }
        }
      } catch {
        console.log("error");
      }
    }
    fetchShopDetails();
  }, [userUid]);

  const showShopData = () => {
    setShowShopDetails(true);
    //  setShopData("dfasdfajkfa")
    console.log("download button click");
  };

  //this is for downlaod the invoice in pdf
  const pdfContentRef = useRef();
  const generatePdfHandler = useReactToPrint({
    content: () => pdfContentRef.current,
    onAfterPrint: () => {
      setShowShopDetails(false);
    },
  });
  // useEffect(() => {
  //   console.log(pdfContentRef.current); // It will have the correct value after the component mounts.
  // }, [])
  useEffect(() => {
    if (pdfContentRef.current) {
      generatePdfHandler();
    }
  }, [generatePdfHandler]);
  console.log(generatePdfHandler);
  console.log("pdf run ");
  console.log("pdf is generated");

  //this code is for pagination
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = bill.slice(firstIndex, lastIndex);
  console.log(records);
  const numberOfPages = Math.ceil(bill.length / recordsPerPage); //numberOfpages=5,means total billls is 50(5*10)
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1); //[1,2,3,4,5]
  // The numbers array will be used to represent the available page numbers, which can be used for pagination purposes, like displaying page navigation links. For example, if numberOfPages is 5, then numbers will be [1, 2, 3, 4, 5], representing the five available pages.
  const startIndex = (currentPage - 1) * recordsPerPage;
  const presentPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  // console.log(bill)

  const handleClose = () => {
    setMedicineDialog((prev) => ({ ...prev, visible: false }));
  };
  function viewHandler(index) {
    setMedicineDialog({
      visible: true,
      billIndex: index,
    });
  }

  async function fetchData() {
    setLoading(true);
    const result = await GetAllBills();
    setBill([...result]);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Navigation />
    
      {loading && <p>Loading..</p>}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Hospital</th>
              <th>Medicine Details</th>
            </tr>
          </thead>
          <tbody>
            {/* this is for the search box */}
            {/* {bill
              .filter((allbill) => {
                return search.toLowerCase() === ""
                  ? allbill
                  : allbill.PatientName.toLowerCase().includes(search);
              })}  */}
            {/* //till here */}
            {records.map((allbill, index) => (
              <tr key={allbill.id}>
                <th>{startIndex + index + 1}</th>
                <td>{allbill.PatientName}</td>
                <td>{allbill.Date}</td>
                <td>{allbill.HospitalName}</td>
                <td>
                  {" "}
                  <button
                    variant="outlined"
                    className={classes.buttons}
                    onClick={() => viewHandler((currentUser = index))}
                  >
                    View Bill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* this is for show the model */}
      {medicineDialog.visible && (
        <Dialog
          fullScreen
          open={medicineDialog.visible}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Button
                sx={{ ml: 2 }}
                variant="h6"
                component="div"
                onClick={handlePrint}
              >
                Print
              </Button>
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    // generatePdfHandler();
                    showShopData();
                  }}
                >
                  Download
                </Button>
              </div>
            </Toolbar>
          </AppBar>

          <DialogBoxContent
            records={records}
            currentUser={currentUser}
            bill={bill}
            medicineDialog={medicineDialog}
          />
        </Dialog>
      )}
      {/* {showShopDetails && <ShopDataFetch/>} */}
      {showShopDetails && (
        <PdfContent
          pdfContentRef={pdfContentRef}
          records={records}
          currentUser={currentUser}
          bill={bill}
          medicineDialog={medicineDialog}
          shopData={shopData}
          showShopDetails={showShopDetails}
        />
      )}
     {/* { console.log(shopData)} */}
      {console.log("pdf page of all bill calls")}

      <nav className={classes.pagination1}>
        <ul
          className="pagination"
          style={{
            margin: "2rem",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <li className="page-item">
            <button className="page-link" onClick={presentPage}>
              Prev
            </button>
          </li>
          {numbers.map((n, i) => {
            return (
              <li
                key={i}
                className={`page-item ${currentPage === n ? "active" : ""}`}
              >
                {console.log("current page", currentPage)}
                {console.log("page number", n)}
                <button className="page-link" onClick={() => changePage(n)}>
                  {n}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AllBill;

          {/* isla kaam karna hai */}
          {/* this is for the search box */}
            {/* {bill
              .filter((allbill) => {
                return search.toLowerCase() === ""
                  ? allbill
                  : allbill.PatientName.toLowerCase().includes(search);
              })}  */}
              {/* //till here */}
//               {records.map((allbill, index) => (
//                 <tr key={allbill.id}>
//                   <th>{startIndex+index+1}</th>
//                   <td>{allbill.PatientName}</td>
//                   <td>{allbill.Date}</td>
//                   <td>{allbill.HospitalName}</td>
//                   <td>
//                     <button variant="outlined" className={classes.buttons} onClick={() => viewHandler((currentUser = index))}>
//                       view bills
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* this is for show the model */}
//       {medicineDialog.visible && (
//         <Dialog
//           fullScreen
//           open={medicineDialog.visible}
//           onClose={handleClose}
//           TransitionComponent={Transition}
//         >
//           <AppBar sx={{ position: "relative" }}>
//             <Toolbar>
//               <IconButton
//                 edge="start"
//                 color="inherit"
//                 onClick={handleClose}
//                 aria-label="close"
//               >
//                 <CloseIcon />
//               </IconButton>
//               <Button sx={{ ml: 2 }} variant="h6" component="div" onClick={handlePrint}>
//                 Print
//               </Button>
//               <Button autoFocus color="inherit" >
//                 {<DownloadInvoice/>}
//               </Button>
//             </Toolbar>
//           </AppBar>


//       <nav className={classes.pagination1}>
//         <ul className="pagination" style={{margin:"2rem", alignItems:"center",backgroundColor:"black"}}>
//           <li className="page-item">
//             <button className="page-link"
//             onClick={presentPage}>Prev</button>
//           </li>
//           {
//             numbers.map((n,i)=>{
//               return(
//               <li key={i} className={`page-item ${currentPage === n ? 'active':''}`} >
//               {console.log("current page",currentPage)}
//               {console.log("page number",n)}
//                  <button className="page-link"
//                  onClick={()=>changePage(n)}>{n}</button>
//               </li>
//             )})
//           }
//           <li className="page-item">
//             <button className="page-link"
//             onClick={nextPage}>Next</button>
//           </li>
//         </ul>
//       </nav>

//     </div>
//   );
// };

// export default AllBill;
//this is for search handler
// {bill
  //     .filter((allbill) => {
  //       return search.toLowerCase() === ""
  //         ? allbill
  //         : allbill.PatientName.toLowerCase().includes(search);
  //     }) //till here
  //     .map((allbill, index) => (
  //       <tr key={allbill.id}>
  //         <th>{index}</th>
  //         <td>{allbill.PatientName}</td>
  //         <td>{allbill.Date}</td>
  //         <td>{allbill.HospitalName}</td>
  //         <td>
  //           <Button
  //             variant="outlined"
  //            className={classes.btn}
  //             onClick={() => viewHandler((currentUser = index))}
  //           >
  //             view bills
  //           </Button>
  //         </td>
  //       </tr>
  //     ))}
