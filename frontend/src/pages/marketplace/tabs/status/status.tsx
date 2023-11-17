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
//   fetch(
//     `/api/codex/v1/storage/request/${cid}`,
//     {
//       headers:
//         (nodeInfo.auth !== null && {
//           Authorization:
//             (nodeInfo.auth && "Basic " + btoa(nodeInfo.auth)) || "",
//         }) ||
//         {},
//       body: JSON.stringify({
//         reward: reward,
//         duration: duration,
//         proofProbability: proofProbability,
//         collateral: collateral
//       })
//     }
//   )
//   // create a popup in the browser to show if the upload was successful
//   .then((response) => {
//       if (response.status === 200) {
//         alert("Upload successful!");
//       } else {
//         alert("Upload failed!");
//       }
//     })
// }
  return (
    <AvailableTabWrapper>
      {/* <div
        id="uploaded-items-wrap"
        style={{
          maxHeight: uploads.length > 0 ? "60vh" : "0%",
        }}
      >
        {uploads.map((file) => (
          <UploadedItemComponent item={file} key={file.cid} />
        ))}
      </div> */}
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
