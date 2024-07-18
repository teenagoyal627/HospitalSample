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

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  currentUserUID,
  bill,
  records,
  handlePrint,
  showShopData,
}) => {
  const [medicineDialog, setMedicineDialog] = useState({
    visible: false,
    billIndex: 0,
  });
   const [searchCurrentUser,setSearchCurrentUser]=useState(null)


// const ConfigureWithLogging=({filters})=>{
// useEffect(()=>{
//   console.log("filtered data",filters)
// },[filters])
// return <Configure filters={filters}/>
// }

  function viewHandler(hits,index) {
    const objectId=hits[index].objectID;
    setSearchCurrentUser(objectId)
    setMedicineDialog({
      visible: true,
      billIndex: index,
    });
  }
  const handleClose = () => {
    setMedicineDialog((prev) => ({ ...prev, visible: false }));
  };

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
               className={classes.hit}
               currentUserUID={currentUserUID}
              />
          
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
const CustomHits = connectHits(({ hits, viewHandler,currentUserUID }) => {
  let serialNumber = 0;
  const filterData=hits.filter(hit=>hit.UserID===currentUserUID)
  return (
    <>
      {filterData.map((hit, index) => (
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

export default SearchBar;
