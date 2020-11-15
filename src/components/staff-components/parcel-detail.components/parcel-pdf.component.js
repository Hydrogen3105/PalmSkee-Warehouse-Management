import React, { useState } from 'react'; 
import { Document, Page,pdfjs } from 'react-pdf'; 
  
//PDFjs worker from an external cdn 
const url =  
"https://cors-anywhere.herokuapp.com/"
  
export default function ParcelLabel({ labelPath }) { 
      
    pdfjs.GlobalWorkerOptions.workerSrc =  
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
     const [numPages, setNumPages] = useState(null); 
      const [pageNumber, setPageNumber] = useState(1); 
  
    function onDocumentLoadSuccess({ numPages }) { 
        setNumPages(numPages); 
        setPageNumber(1); 
    }
    const used_url = url + labelPath
    return ( 
        <> 
        <div className="main"> 
            <Document 
                file={used_url} 
                onLoadSuccess={onDocumentLoadSuccess} 
                > 
                <Page pageNumber={pageNumber} height={500}/> 
            </Document> 
        </div> 
        </> 
    )
}