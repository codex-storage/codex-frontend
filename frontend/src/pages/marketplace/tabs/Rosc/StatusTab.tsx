import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import RequestForStorageContractModel from "../../../../data/models/RequestForStorageContractModel";
import axios from "axios";

import { useDexyStore } from "../../../../store";
import constants from "../../../../util/Constants";
import RequestForStorageContractComponent from "../../../../components/RequestForStorageItem/RequestForStorageItemComponent";

function StatusTab() {
  const { storageRequests, setStorageRequests, nodeInfo } = useDexyStore();
  const purchaseIds = useRef<string[]>([]);
  const purchaseInfo = useRef<RequestForStorageContractModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Fetch purchase IDs
    fetch(`/api/codex/v1/storage/purchases`, {
      headers: {
        Authorization: nodeInfo.auth ? "Basic " + btoa(nodeInfo.auth) : "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        purchaseIds.current = data;
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching purchase IDs:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (purchaseIds.current.length > 0) {
      setIsLoading(true);
      // Fetch purchase info for each purchase ID
      Promise.all(
        purchaseIds.current.map((purchaseId) =>
          fetch(`/api/codex/v1/storage/purchases/${purchaseId}`, {
            headers: {
              Authorization: nodeInfo.auth ? "Basic " + btoa(nodeInfo.auth) : "",
            },
          }).then((response) => response.json())
        )
      )
        .then((data) => {
          purchaseInfo.current = data;
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching purchase info:", error);
          setIsLoading(false);
        });
    }
  }, [purchaseIds.current]);

  useEffect(() => {
    if (purchaseInfo.current.length !== storageRequests.length) {
      setStorageRequests(purchaseInfo.current);
    }
  }, [purchaseInfo.current]);

  return (
    <StatusTabWrapper>
      <div
        id="request-wrap"
        style={{
          maxHeight: purchaseIds.current.length > 0 ? "60vh" : "0%",
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          storageRequests.map((item) => (
            <RequestForStorageContractComponent
              item={item}
              key={item.requestId}
            />
          ))
        )}
      </div>
    </StatusTabWrapper>
  );
}

export default StatusTab;

const StatusTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 16px;

  #request-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    overflow-y: scroll;
    margin-top: 16px;
  }
`;
