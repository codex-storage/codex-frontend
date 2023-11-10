import { useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import UploadedItemModel, {
  UploadedItemStatus,
} from "../../../../data/models/UploadedItemModel";
import UploadedItemComponent from "../../../../components/uploadedItem/UploadedItemComponent";
import axios from "axios";

import { useDexyStore } from "../../../../store";
import constants from "../../../../util/Constants";

function AvailableTab() {
//   const { uploads, setUploads, nodeInfo } = useDexyStore();
//   var filesCopy = useRef<UploadedItemModel[]>(uploads);

//   useEffect(() => {
//     console.log(uploads);
//     // setUploads([]);
//   }, [uploads]);

//   const onDrop = useCallback(
//     async (acceptedFiles: File[]) => {
//       console.log(acceptedFiles);
//       for (let i = 0; i < acceptedFiles.length; i++) {
//         new Promise(async (resolve, reject) => {
//           let cid: string = (Math.random() * 1000000).toString();
//           console.log(cid + acceptedFiles[i].name);
//           filesCopy.current.push({
//             cid: cid,
//             fileName: acceptedFiles[i].name,
//             fileSize: acceptedFiles[i].size,
//             lastModified: new Date(
//               acceptedFiles[i].lastModified
//             ).toLocaleString(),
//             type: acceptedFiles[i].type,
//             status: UploadedItemStatus.UPLOADING,
//           });
//           setUploads(filesCopy.current);

//           var bytes = await acceptedFiles[i].arrayBuffer();
//           bytes = new Uint8Array(bytes);

//           var newCid = "";
//           try {
//             await axios
//               .post(`/api/codex/v1/upload`, bytes, {
//                 headers: (nodeInfo.auth !== null && {
//                   "Base-Url": nodeInfo.nodeToConnectTo || nodeInfo.baseUrl,
//                   "Content-Type": "application/octet-stream",
//                   "Auth-String": nodeInfo.auth,
//                 }) || {
//                   "Base-Url": nodeInfo.nodeToConnectTo || nodeInfo.baseUrl,
//                   "Content-Type": "application/octet-stream",
//                 },
//               })
//               .then((response) => {
//                 newCid = response.data;
//               });

//             filesCopy.current = filesCopy.current.filter(
//               (file) => file.cid !== cid
//             );
//             filesCopy.current.push({
//               cid: newCid,
//               fileName: acceptedFiles[i].name,
//               fileSize: acceptedFiles[i].size,
//               lastModified: new Date(
//                 acceptedFiles[i].lastModified
//               ).toLocaleString(),
//               type: acceptedFiles[i].type,
//               status: UploadedItemStatus.UPLOADED,
//             });
//             setUploads(filesCopy.current);
//             console.log("filesCopy");
//             console.log(filesCopy.current);
//           } catch (error) {
//             console.log(error);
//             filesCopy.current = filesCopy.current.filter(
//               (file) => file.cid !== cid
//             );
//             filesCopy.current.push({
//               cid: "Failed",
//               fileName: acceptedFiles[i].name,
//               fileSize: acceptedFiles[i].size,
//               lastModified: new Date(
//                 acceptedFiles[i].lastModified
//               ).toLocaleString(),
//               type: acceptedFiles[i].type,
//               status: UploadedItemStatus.FAILED,
//             });
//             console.log("filesCopy failed");
//             console.log(filesCopy.current);
//             setUploads(filesCopy.current);
//           }
//           console.log(cid + acceptedFiles[i].name);
//           resolve("done");
//         });
//       }
//     },
//     [setUploads, filesCopy, nodeInfo]
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <AvailableTabWrapper>
      <div>
      </div>
    </AvailableTabWrapper>
  );
}

export default AvailableTab;

const AvailableTabWrapper = styled.div`
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