import { useState } from "react";
import constants from "../../../../util/Constants";
import styled from "styled-components";
import { useDexyStore } from "../../../../store";

function DownloadTab() {
  const { ftdCid, setFtdCid, nodeInfo } = useDexyStore();

  const [filename, setFilename] = useState("file");
  const [error, setError] = useState("");

  function download(cid: string) {
    console.log(filename);
    console.log(cid);
    fetch(
      `/api/codex/v1/data/${cid}/network`,
      {
        headers:
          (nodeInfo.auth !== null && {
            Authorization:
              (nodeInfo.auth && "Basic " + btoa(nodeInfo.auth)) || "",
          }) ||
          {},
      }
    )
      .then((response) =>
      {
        if (response.status === 200) {
          response.blob()
          .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
        })
      }
      else {
        response.text().then((text) => {
          setError(text);
        }).catch((error) => {
          console.error("Error reading response body:", error);
          setError("Failed to read response body");
        });
      }
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
      setError("Failed to download file");
    });
  }

  return (
    <>
      <DownloadTabWrapper>
        <input
          type="text"
          placeholder="CID"
          onChange={(e) => {
            setFtdCid(e.target.value);
          }}
          value={ftdCid}
        />
        <div id="divider"></div>
        <input
          type="text"
          placeholder="Filename"
          onChange={(e) => setFilename(e.target.value)}
        />
        <button onClick={() => download(ftdCid)}>Download</button>
      </DownloadTabWrapper>
      {error && (
        <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {error}
        </p>
      )}
    </>
  );
}

export default DownloadTab;

const DownloadTabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 75%;

  input {
    flex: 3;
    height: 60px;
    padding: 10px 20px;
    border: none;
    background-color: ${constants.surfaceColor};
    color: ${constants.onSurfaceColor};
    width: 100%;
  }

  input:focus {
    outline: none;
    border: 2px solid ${constants.primaryColor};
  }

  input:nth-child(1) {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  #divider {
    width: 2.5px;
    height: 60px;
    background-color: #555555;
  }

  button {
    flex: 2;
    height: 60px;
    border: none;
    background-color: ${constants.primaryColor};
    color: ${constants.onPrimaryColor};
    font-size: 1rem;
    cursor: pointer;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 100%;
  }

  @media (max-width: 1180px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 85%;
  }

  @media (max-width: 450px) {
    width: 90%;
  }
`;
