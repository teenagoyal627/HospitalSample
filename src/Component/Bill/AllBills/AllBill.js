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
import Navigation from "../../Header/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from "react-to-print";
import DialogBoxContent from "./DialogBoxContent";
import PdfContent from "./PdfContent";
import useShopDataFetch from "./ShopDataFetch";
import SearchDialog from "./SearchBox";
import HeaderLine from "../../Header/HeaderLine2";
// import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
// import algoliasearch from "algoliasearch/lite";

// const searchClient=algoliasearch("VHM3LXOYSO","fc57003e15c5e48763d28c4546a6683b")

// let currentUser = null;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AllBill = () => {
  const shopData=useShopDataFetch();//this is custom hook
  console.log("the data of shop is ",shopData)
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [medicineDialog, setMedicineDialog] = useState({
    visible: false,
    billIndex: 0,
  });
  const [showShopDetails, setShowShopDetails] = useState(false);
  const[currentUser,setcurrentUser]=useState(null)
  const showShopData = () => {
    setShowShopDetails(true);
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
  // console.log(records);
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

  const handleClose = () => {
    setMedicineDialog((prev) => ({ ...prev, visible: false }));
  };

  function viewHandler(index) {
    console.log(index)
    setcurrentUser(index)
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
      <SearchDialog
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      bill={bill}
      records={records}
      viewHandler={viewHandler}
      currentUser={currentUser}
      setcurrentUser={setcurrentUser}
      handlePrint={handlePrint}
      showShopData={showShopData}
     />

      {loading && <p>Loading..</p>}
      {!searchQuery &&  (  
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
                    onClick={() => viewHandler(index)}
                  >
                    View Bill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {/* this is for show the model */}
      {medicineDialog.visible && (
        <React.Fragment>
        <Dialog
        fullScreen
        open={medicineDialog.visible}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
       {/* <AppBar sx={{ position: 'relative' }} style={{backgroundColor:"green",height:"2rem",marginTop:".3rem"}}> */}
          <Toolbar style={{backgroundColor:"skyblue",height:"5rem"}}>
            <IconButton
            style={{marginRight:"2rem"}}
              edge="start"
              color="black"
              onClick={handleClose}
              aria-label="close"
            >
               <CloseIcon />
            </IconButton>

            <Button style={{backgroundColor:"green",marginRight:"3rem",width:"8rem",fontSize:"1rem",fontWeight:"bold"}} autoFocus color="inherit" onClick={handlePrint}>
              Print
            </Button>
            <Button style={{backgroundColor:"green",marginRight:"3rem",width:"8rem",fontSize:"1rem",fontWeight:"bold"}}
                  color="inherit"
                  onClick={() => {
                    showShopData();
                  }}
                >
                  Download
                </Button>
                </Toolbar>
          {/* </AppBar> */}
          <DialogBoxContent
            records={records}
            currentUser={currentUser}
            bill={bill}
            medicineDialog={medicineDialog}
          />
          </Dialog>
        </React.Fragment>
      )}
        
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
     { console.log(shopData)}
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
