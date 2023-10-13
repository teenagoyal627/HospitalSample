//this file is also for testing
import React from 'react'
import PdfContent from './PdfContent'

const PdfPage = ({
  records,
  currentUser,
  bill,
  medicineDialog,
  shopData,
  showShopDetails,
  totalAmount,
  pdfContentRef
}) => {
  return (
    <div ref={pdfContentRef} style={{width:"100%"}}>
{console.log(shopData)}
       {showShopDetails && (
        
        <div>
        {/* <ShopDataFetch/>
        <p>pdf page ka shop data</p> */}
        <PdfContent
          records={records}
          currentUser={currentUser}
          bill={bill}
          medicineDialog={medicineDialog}
          shopData={shopData}
          showShopDetails={showShopDetails}
          totalAmount={totalAmount}
          pdfContentRef={pdfContentRef}

        />
        </div>
       )}
        
      </div>
  )
}

export default PdfPage
