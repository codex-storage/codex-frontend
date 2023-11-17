import React from "react";
import styled from "styled-components";

import { CircularProgress } from "@mui/material";
import { MdCheck, MdError } from "react-icons/md";
import RequestForStorageContractModel from "../../data/models/RequestForStorageContractModel";
import constants from "../../util/Constants";

function RequestForStorageContractComponent(props: { item: RequestForStorageContractModel }) {
  return (
    <RequestForStorageContractComponentWrapper>
      <div>
        <p>
          <span>Request ID: </span>
          {props.item.requestId}
        </p>
      </div>
      <div>
        <p>
          <span>Client: </span>
          {props.item.request.client}
        </p>
      </div>
      <div>
        <p>
          <span>Content: </span>
          {props.item.request.content.cid}
        </p>
      </div>
    </RequestForStorageContractComponentWrapper>
  );
}

export default RequestForStorageContractComponent;

const RequestForStorageContractComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${constants.surfaceColor};
  border-radius: 8px;
  padding: 10px;
  width: 80%;
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 5px;
  }

  div p:nth-child(1) {
    text-align: start;
  }

  div p:nth-child(2) {
    text-align: end;
  }

  p {
    flex: 1;
    font-size: 1rem;
    text-align: start;
    margin: 5px;
  }

  p span {
    font-weight: bold;
  }

  #cid {
    flex: 2;
  }

  @media (max-width: 1180px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 450px) {
    width: 95%;
  }
`;
