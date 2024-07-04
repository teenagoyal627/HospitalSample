import React ,{useState}from "react";
import classes from './AllBill.module.css';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  connectHits,
} from 'react-instantsearch-dom';
import SearchDialogBoxContent from "./SearchedDialogBox";

const searchClient = algoliasearch('14OX7XE6JW', '743e303ed56223046ae6fdd3a4137847')
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SearchDialog = ({
  searchQuery,
  setSearchQuery,
  bill,
  records,
  handlePrint,
  showShopData,
 currentUser,
 setCurrentUser

}) => {
  const [medicineDialog, setMedicineDialog] = useState({
    visible: false,
    billIndex: 0,
  });
   const [searchCurrentUser,setSearchCurrentUser]=useState(null)

  function viewHandler(hits,index) {
    const objectId=hits[index].objectID;
    console.log("the index number of aloglia search ",objectId)
    setSearchCurrentUser(objectId)
    setMedicineDialog({
      visible: true,
      billIndex: index,
    });
  }
  const handleClose = () => {
    setMedicineDialog((prev) => ({ ...prev, visible: false }));
  };

  console.log(searchQuery);
  return (
    <InstantSearch
    className={classes.instantSearch}
      searchClient={searchClient}
      indexName="AllBills"
    >
    <div className={classes.search} >
        <SearchBox
          translations={{ placeholder: "Search Bill by Patient, Hospital & Doctor Name" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
      {searchQuery.length > 0 && (
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
            <CustomHits
             viewHandler={(hits,index)=>viewHandler(hits,index)}
              searchCurrentUser={searchCurrentUser} 
               currentUser={currentUser}
               setCurrentUser={setCurrentUser} 
               className={classes.hit}
              />
            {console.log('search currentUser according to algolia search' ,searchCurrentUser)}
            {console.log('currentUser according to algolia search' ,currentUser)}
            {console.log(' set currentUser according to algolia search' ,setCurrentUser)}

          </tbody>
        </table>
      )}
      {medicineDialog.visible && (
        <Dialog
          fullScreen
          open={medicineDialog.visible}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
        <div>
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
                sx={{ ml: 1 }}
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
                    showShopData();
                  }}
                >
                  Download
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          </div>

          <SearchDialogBoxContent
            records={records}
            searchCurrentUser={searchCurrentUser}
            bill={bill}
            medicineDialog={medicineDialog}
            
          />
        </Dialog>
        )
      }
    </InstantSearch>
  );
};
const CustomHits = connectHits(({ hits, viewHandler,searchCurrentUser }) => {
  let serialNumber = 0;
  return (
    <>
      {hits.map((hit, index) => (
        <tr key={hit.objectID}>
          <td>{++serialNumber}</td>
          <td>{hit.PatientName}</td>
          <td>{hit.Date}</td>
          <td>{hit.HospitalName}</td>
          <td>
            <button
              variant="outlined"
              className={classes.buttons}
              onClick={() => viewHandler(hits,index)}
            >
              View Bill
            </button>
          </td>
        </tr>
      ))}
     
    </>
  )
})

export default SearchDialog;

// i write code same as allbill.js file so why it is work for this and not for searchDialog.js component see this is my allbill.js code of viewHandler function ```function viewHandler(index) {
//   setMedicineDialog({
//     visible: true,
//     billIndex: index,
//   });
// }
// ``` and here i pass this as a current user ```<td>
//                 {" "}
//                 <button
//                   variant="outlined"
//                   className={classes.buttons}
//                   onClick={() => viewHandler((currentUser=index))}
//                 >
//                   View Bill
//                 </button>
//               </td>``` and for show dialog box i write condition if index is equal to currentuser then it show the dilaog box and its data see code here ``` <form className={classes.form}>
//     <div>
//     {records
//     .filter((item, index) => index===currentUser)
//     .map((filterdata) => ( 
//           <div key={filterdata.id}>
//             <h3>Medical Invoice</h3>
//             <div className={classes.container}>
//               <div className={classes.leftData}>
//                 <p>Date: {filterdata.Date}</p>
//                 <p>Hospital Name: {filterdata.HospitalName}</p>
//                 <p>Doctor Name: {filterdata.DoctorName}</p>
//               </div>

//               <div className={classes.rightData}>
//                 <p>Patient Name: {filterdata.PatientName}</p>
//                 <p>Mobile Number:{filterdata.MobileNumber}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>``` so why it is not works with searchDialog i write code same as allbill.js still it not work see my searchDialog box code ```const CustomHits = connectHits(({ hits ,viewHandler}) => {
// let serialNumber=0;
// return (
//   <>
//     {hits.map((hit,index) => (
//         <tr key={hit.objectID}>
//           <td>{++serialNumber}</td>
//           <td>{hit.PatientName}</td>
//           <td>{hit.Date}</td>
//           <td>{hit.HospitalName}</td>
//           <td>
//           <button
//                   variant="outlined"
//                   className={classes.buttons}
//                   onClick={() => viewHandler(currentUser=index)}
//                 >
//                   View Bill
//                 </button>
//               </td>
//         </tr>
//     ))}
//   </>
// )
// })
// ```