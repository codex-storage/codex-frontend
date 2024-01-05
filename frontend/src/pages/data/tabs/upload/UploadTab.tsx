import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import UploadedItemModel, {
  UploadedItemStatus,
} from "../../../../data/models/UploadedItemModel";
import UploadedItemComponent from "../../../../components/uploadedItem/UploadedItemComponent";
import axios from "axios";

import { useDexyStore } from "../../../../store";
import constants from "../../../../util/Constants";

function UploadTab() {
  const { uploads, setUploads, nodeInfo } = useDexyStore();
  var files = useRef<UploadedItemModel[]>(uploads);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getDatas() {
    fetch(`/api/codex/v1/data`, {
      headers: {
        Authorization: nodeInfo.auth ? "Basic " + btoa(nodeInfo.auth) : "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUploads(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/codex/v1/data`, {
        headers: {
          Authorization: nodeInfo.auth ? "Basic " + btoa(nodeInfo.auth) : "",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUploads(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setIsLoading(false);
        });
    };

    const fetchDataInterval = setInterval(() => {
      // Fetch data at regular intervals (every 5 seconds)
      setIsLoading(true);
      fetchData();
    }, 5000); // 5 seconds in milliseconds

    // Fetch data immediately when the component mounts
    setIsLoading(true);
    fetchData();

    return () => {
      // Clean up interval on component unmount
      clearInterval(fetchDataInterval);
    };
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      for (let i = 0; i < acceptedFiles.length; i++) {
        new Promise(async (resolve, reject) => {
          let cid: string = (Math.random() * 1000000).toString();
          console.log(cid + acceptedFiles[i].name);

          var bytes = await acceptedFiles[i].arrayBuffer();
          bytes = new Uint8Array(bytes);

          var newCid = "";
          try {
            await axios
              .post(`/api/codex/v1/data`, bytes, {
                headers: (nodeInfo.auth !== null && {
                  "Base-Url": nodeInfo.nodeToConnectTo || nodeInfo.baseUrl,
                  "Content-Type": "application/octet-stream",
                  "Auth-String": nodeInfo.auth,
                }) || {
                  "Base-Url": nodeInfo.nodeToConnectTo || nodeInfo.baseUrl,
                  "Content-Type": "application/octet-stream",
                },
              })
              .then((response) => {
                if (response.status === 200) {
                  newCid = response.data;
                  getDatas();
                } else {
                  setError("Upload failed");
                }
              });
            console.log("filesCopy failed");
          } catch (error) {
            console.error("Error uploading file: ", error);
            setError("Upload failed");
          }
          console.log(cid + acceptedFiles[i].name);
          resolve("done");
        });
      }
    },
    [setUploads, nodeInfo]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <UploadTabWrapper>
        <div
          id="dropzone"
          {...getRootProps()}
          style={{
            minHeight: uploads.length > 0 ? "33%" : "100%",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <div
          id="uploaded-items-wrap"
          style={{
            maxHeight: uploads.length > 0 ? "60vh" : "0%",
          }}
        >
          {uploads.map((file) => (
            <UploadedItemComponent item={file} key={file.cid} />
          ))}
        </div>
      </UploadTabWrapper>
      {error && (
        <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {error}
        </p>
      )}
    </>
  );
}

export default UploadTab;

const UploadTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 16px;

  #dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 2px dashed #9e9e9e;
    border-radius: 8px;
  }

  p {
    font-size: 1rem;
    text-align: center;
  }

  #uploaded-items-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    overflow-y: scroll;
    margin-top: 16px;
  }
`;
