"use client";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function ImportProductsPage() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Create a FileReader to read the file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e?.target?.result);
        // Parse the Excel file
        const workbook = XLSX.read(data, { type: "array" });
        // Get the first sheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Import Products</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
}
