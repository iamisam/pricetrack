import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdf from "../../src/guide.pdf";

const PDFComponent = () => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <Document className="p-5 bg-amber-100" file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
      <div className="text-center">
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </div>
      </Document>
      <div className="flex justify-between items-center mt-4">
        {/* Previous button */}
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${pageNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={goToPreviousPage}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <p className="text-black font-semibold bg-white p-2 rounded-md">
          Page {pageNumber} / {numPages}
        </p>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${pageNumber === numPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={goToNextPage}
          disabled={pageNumber === numPages}
        >
          Next
        </button>
      </div> 
    </div>
  );
}

export default PDFComponent;