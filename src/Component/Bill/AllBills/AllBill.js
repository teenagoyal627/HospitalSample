import React, { useEffect, useRef, useState } from "react";
import classes from "./AllBill.module.css";
import Dialog from "@mui/material/Dialog";
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
import DownloadPdfContent from "./DownloadPdfContent";
import ShopDataFetch from "./ShopDataFetch";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AllBill = () => {
  const [loading, setLoading] = useState(false);
  const [bill, setBill] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [medicineDialog, setMedicineDialog] = useState({
    visible: false,
    billIndex: 0,
  });
  const [showShopDetails, setShowShopDetails] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentUserUID, setCurrentUserUID] = useState(null);

  useEffect(() => {
    const userId = getAuth().currentUser.uid;
    if (userId) setCurrentUserUID(userId);
  }, []);

  // this is for fetch the all the bill
  async function fetchData() {
    setLoading(true);
    const result = await GetAllBills();
    setBill([...result]);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  // this is for fetch the shop details
  const shopData = ShopDataFetch();
  const showShopData = () => {
    setShowShopDetails(true);
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

  //this code is for pagination
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = bill.slice(firstIndex, lastIndex);
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
    setCurrentIndex(index);
    setMedicineDialog({
      visible: true,
      billIndex: index,
    });
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Navigation />
      {bill.length === 0 ? (
        <div className={classes.messageContainer}>
          <div>
            <div className={classes.message}>
              Currently, there are no bills created in your store. To view bill
              entries, please create a bill first.
            </div>
            <Link to="/createBill">
              <button
                type="submit"
                style={{ width: "20rem" }}
                className={`button ${classes.centerButton}`}
              >
                Go to Create Bills of Patients
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {currentUserUID &&
            (<SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                bill={bill}
                records={records}
                currentIndex={currentIndex}
                currentUserUID={currentUserUID}
                handlePrint={handlePrint}
                showShopData={showShopData}
              />)}
          {loading && <p>Loading..</p>}
          {!searchQuery && (
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
        </>
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
            <Toolbar style={{ backgroundColor: "#1b3e5a ", height: "5rem" }}>
              <IconButton
                style={{ marginRight: "2rem",backgroundColor:"white" ,height:"2rem"}}
                edge="start"
                color="white"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>

              <button className={classes.buttons} style={{width:"10rem"}}
                autoFocus
                color="inherit"
                onClick={handlePrint}
              >
                Print
              </button>
              <button className={classes.buttons} style={{width:"10rem",marginLeft:"3rem"}}
                onClick={() => {
                  showShopData();
                }}
              >
                Download
              </button>
            </Toolbar>
            <DialogBoxContent
              records={records}
              currentIndex={currentIndex}
              bill={bill}
              medicineDialog={medicineDialog}
            />
          </Dialog>
        </React.Fragment>
      )}
      {showShopDetails && (
        <DownloadPdfContent
          pdfContentRef={pdfContentRef}
          records={records}
          currentIndex={currentIndex}
          bill={bill}
          medicineDialog={medicineDialog}
          shopData={shopData}
          showShopDetails={showShopDetails}
        />
      )}
    </div>
  );
};

export default AllBill;
