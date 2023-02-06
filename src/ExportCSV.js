import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const ExcelExportHelper = ({ csvData }) => {
  const createDownLoadData = () => {
    handleExport().then((url) => {
    //   console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "student_report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    // console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    // console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
    //   console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(csvData);

    XLSX.utils.book_append_sheet(wb, sheet, "employee_report");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    // csvData.forEach((data, index) =>
    //   data[0] === "EMPID" ? headerIndexes.push(index) : null
    // // console.log("data",data["A"])
    // );

    let arrLen = csvData.length;
    if(arrLen > 0) {
        let custObj = csvData[0];
        // console.log(custObj);
        let keys = Object.keys(custObj)
        // console.log("keys", keys);
        keys.forEach((data,i) =>
        keys.length > 0 ? headerIndexes.push(i) : null
        )
    }

    const dataInfo = {
      tbodyRange: `A2:C${csvData.length}`,
      theadRange:
        headerIndexes.length >= 1
          ? `A${headerIndexes[0] + 1}:C${headerIndexes[0] + 1}`
          : null,
    //   theadRange1:
    //     headerIndexes.length >= 2
    //       ? `A${headerIndexes[1] + 1}:D${headerIndexes[1] + 1}`
    //       : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
        // console.log(workbook);
      workbook.sheets().forEach((sheet) => {
        // sheet.usedRange().style({
        //   fontFamily: "Arial",
        //   verticalAlignment: "center",
        // });


        // if (dataInfo.tbodyRange) {
        //   sheet.range(dataInfo.tbodyRange).style({
        //     horizontalAlignment: "center",
        //   });
        // }

        sheet.range(dataInfo.theadRange).autoFilter();

        // console.log("range",dataInfo.theadRange);
        sheet.range(dataInfo.theadRange).style({
          fill: "00bfff",
          bold: true,
          horizontalAlignment: "center",
          fontColor: "000000",
        });
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      onClick={() => {
        createDownLoadData();
      }}
      className="btn btn-primary float-end"
    >
      Export
    </button>
  );
};

export default ExcelExportHelper;
