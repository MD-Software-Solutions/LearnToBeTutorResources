import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import "./index.scss";

export default function WorksheetTable({ webUrl, grade }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [failedLoad, setFailedLoad] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const toast = useRef(null);
  const success_toast = useRef(null);
  const warning_toast = useRef(null);
  const hasRunOnce = useRef(false);

  const showSuccess = () => {
    success_toast.current.show({
      severity: "success",
      summary: "Content Successfully Loaded",
      detail: "Hundreds of sheets at your disposal...",
      life: 5000,
    });
  };

  const k5link = (
    <a
      href="https://www.k5learning.com/free-math-worksheets"
      target="_blank"
      rel="noopener noreferrer"
    >
      Click Here
    </a>
  );

  const showWarning = () => {
    success_toast.current.show({
      severity: "warn",
      summary: "Content failed to load",
      detail: <div>Please try this link: {k5link}</div>, // Embed JSX here
      life: 100000,
    });
  };

  const showSticky = () => {
    toast.current.show({
      severity: "info",
      summary: "Hang on a couple minutes...",
      detail: "Loading hundreds of sheets!",
      sticky: true,
    });
    hasRunOnce.current = true;
  };

  const position = windowWidth < 870 ? "top-center" : "top-right";

  const clear = () => {
    toast.current.clear();
    hasRunOnce.current = false;
  };

  // Helper function to capitalize words
  const capitalizeWords = (str) =>
    str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  // Extract the source from a URL
  const extractSource = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace("www.", "");
    } catch (error) {
      return "Unknown Source";
    }
  };

  useEffect(() => {
    const resizer = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizer);

    return () => {
      window.removeEventListener("resize", resizer);
    };
  });

  useEffect(() => {
    if (loading && !hasRunOnce.current) {
      showSticky();
    } else if (!loading && !failedLoad) {
      clear();
      showSuccess();
    } else if (failedLoad) {
        clear();
        showWarning();
    }
  }, [loading]);

  // Fetch links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(
          `https://tutor-resource-scraper-ltb.onrender.com/scrape-links-k5?url=${webUrl}`
        );
        const linksData = response.data.filteredPdfLinks || [];

        // Map links to data structure
        const tableData = linksData.map((link) => {
          const rawTitle = link.split("/").pop().replace(".pdf", "");
          const cleanedTitle = capitalizeWords(
            rawTitle.replace(`grade-${grade}-`, "")
          );
          const source = extractSource(link);
          return {
            rawTitle: rawTitle,
            title: cleanedTitle,
            source: source,
            link: link,
          };
        });

        setData(tableData);
      } catch (error) {
        console.error("Error fetching links:", error);
        setFailedLoad(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [webUrl, grade]);

  // Pagination state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Filtered data based on search query
  const filteredData = data.filter((row) =>
    row.rawTitle.toLowerCase().includes(search.toLowerCase())
  );

  // Link template
  const linkTemplate = (rowData) =>
    rowData.link ? (
      <a href={rowData.link} target="_blank" rel="noopener noreferrer">
        {rowData.link}
      </a>
    ) : (
      <Skeleton width="100%" height="1.5rem" />
    );

  // Title template
  const titleTemplate = (rowData) =>
    rowData.title || <Skeleton width="100%" height="1.5rem" />;

  // Source template
  const sourceTemplate = (rowData) =>
    rowData.source || <Skeleton width="100%" height="1.5rem" />;

  // Open button template
  const openTemplate = (rowData) => (
    <Button
      icon="pi pi-window-maximize"
      label="Open in page"
      onClick={() => {
        setIframeSrc(rowData.link);
        setDialogVisible(true);
      }}
    />
  );

  // Skeleton template
  const skeletonTemplate = () => <Skeleton width="300px" height="1.5rem" />;

  // Paginated data
  const paginatedData = filteredData.slice(first, first + rows);

  return (
    <div>
      <div className="toast-card">
        <Toast ref={toast} position={position} />
      </div>
      <div className="toast-card">
        <Toast ref={success_toast} position={position} />
      </div>
      <div className="toast-card">
        <Toast ref={warning_toast} position={position} />
      </div>
      <h3>All the math worksheets you could want:</h3>
      <div className="space-t space-b">
        <Toolbar
          start={
            <div>
              <h3>Worksheet Explorer</h3>
            </div>
          }
          end={
            <div className="p-inputgroup">
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title"
              />
            </div>
          }
        />
      </div>
      <div className="datatable-style">
        <DataTable
          value={loading ? Array(rows).fill({}) : paginatedData}
          rows={rows}
          first={first}
          onPage={onPageChange}
        >
          {/* Non-frozen columns */}
          <Column
            field="title"
            header="Title"
            body={loading ? skeletonTemplate : titleTemplate}
          />
          <Column
            field="source"
            header="Source"
            body={loading ? skeletonTemplate : sourceTemplate}
          />
          <Column
            header="Link"
            body={loading ? skeletonTemplate : linkTemplate}
          />

          {/* Frozen "Open" column */}
          <Column
            header="Open"
            body={openTemplate}
            frozen
            alignFrozen="right"
            style={{ minWidth: "fit-content" }}
          />
        </DataTable>
      </div>

      <Paginator
        first={first}
        rows={rows}
        totalRecords={filteredData.length}
        onPageChange={onPageChange}
        rowsPerPageOptions={[10, 20, 30]}
        className="datatable_paginator"
      />

      <Dialog
        header="PDF Viewer"
        visible={dialogVisible}
        style={{ width: "90vw", height: "100%", margin: 0, padding: 0 }}
        maximizable
        onHide={() => setDialogVisible(false)}
      >
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            title="PDF Viewer"
            style={{ width: "100%", height: "100%", border: "none" }}
          ></iframe>
        )}
      </Dialog>
    </div>
  );
}
