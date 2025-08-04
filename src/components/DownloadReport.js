import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";

function DownloadReport() {
  const [quarter, setQuarter] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [downloadOption, setDownloadOption] = useState(""); 

  const token = Cookies.get("token");

  const downloadReport = async (type, value) => {
    if (!token) {
      alert("Authentication token missing");
      return;
    }

    const url = `http://localhost:8080/reports/download${type}Report/${value}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${type}_Report_${value}.pdf`; 
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(`${type} report download error:`, error);
      alert(`Failed to download ${type.toLowerCase()} report.`);
    }
  };

  const handleDownload = () => {
    if (downloadOption === "quarterly") {
      if (!quarter) {
        alert("Please select a quarter");
        return;
      }
      downloadReport("Quarterly", quarter);
    } else if (downloadOption === "monthly") {
      if (!month) {
        alert("Please select a month");
        return;
      }
      downloadReport("Monthly", month);
    } else if (downloadOption === "yearly") {
      if (!year) {
        alert("Please enter a year");
        return;
      } else if (!/^[2][0-9]{3}$/.test(year)) {
        alert("Please enter a valid year in the format of 2xxx");
        return;
      }
      downloadReport("Yearly", year);
    } else {
      alert("Please select a download option");
    }
  };

  return (
    <>
      <Form.Group controlId="formDownloadOption" className="my-3">
        <Form.Label>Download Option</Form.Label>
        <Form.Control
          as="select"
          value={downloadOption}
          onChange={(e) => setDownloadOption(e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="quarterly">Quarterly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Form.Control>
      </Form.Group>

      {downloadOption === "quarterly" && (
        <Form.Group controlId="formQuarter">
          <Form.Label>Quarter</Form.Label>
          <Form.Control
            as="select"
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
          >
            <option value="">Select Quarter</option>
            <option value="1">Q1</option>
            <option value="2">Q2</option>
            <option value="3">Q3</option>
            <option value="4">Q4</option>
          </Form.Control>
        </Form.Group>
      )}

      {downloadOption === "monthly" && (
        <Form.Group controlId="formMonth">
          <Form.Label>Month</Form.Label>
          <Form.Control
            as="select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((m, i) => (
              <option key={i + 1} value={i + 1}>{m}</option>
            ))}
          </Form.Control>
        </Form.Group>
      )}

      {downloadOption === "yearly" && (
        <Form.Group controlId="formYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Form.Group>
      )}

      <Button className="my-3" variant="primary" onClick={handleDownload}>
        Download Report
      </Button>
    </>
  );
}

export default DownloadReport;
