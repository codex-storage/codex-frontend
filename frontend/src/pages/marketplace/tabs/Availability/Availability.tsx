import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useDexyStore } from "../../../../store";
import AvailableComponent from "../../../../components/AvailableComponent/AvailableComponent";

function AvailabilitiesTab() {
  const { storageOffers, setStorageOffers, nodeInfo } = useDexyStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Fetch purchase IDs
    fetch(`/api/codex/v1/sales/availability`, {
      headers: {
        Authorization: nodeInfo.auth ? "Basic " + btoa(nodeInfo.auth) : "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStorageOffers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching purchase IDs:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <AvailabilitiesTabWrapper>
      <div
        id="request-wrap"
        style={{
          maxHeight: storageOffers.length > 0 ? "60vh" : "0%",
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          storageOffers.map((item) => (
            <AvailableComponent
                item={item}
            />
          ))
        )}
      </div>
    </AvailabilitiesTabWrapper>
  );
}

export default AvailabilitiesTab;

const AvailabilitiesTabWrapper = styled.div`
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
