import React from "react";
import styled from "styled-components";
import { NodeInfoModel } from "../../data/models/NodeInfoModel";
import DropDownList from "../layout/dropDownList/DropDownList";

function NodeInfoItemComponent(props: {
  data: NodeInfoModel | undefined;
}) {
  return (
    (props.data && (
      <NodeInfoItemComponentWrapper>
        <div id="info-row">
          <p>
            <span>TotalBlocks: </span>
            {props.data.totalBlocks}
          </p>
        </div>
        <div id="info-row">
          <p>
            <span>QuotaMaxBytes: </span>
            {props.data.quotaMaxBytes}
          </p>
        </div>
        <div id="info-row">
          <p>
            <span>QuotaUsedBytes: </span>
            {props.data.quotaUsedBytes}
          </p>
        </div>
        <div id="info-row">
          <p>
            <span>QuotaReservedBytes: </span>
            {props.data.quotaReservedBytes}
          </p>
        </div>
      </NodeInfoItemComponentWrapper>
    )) || <></>
  );
}

export default NodeInfoItemComponent;

const NodeInfoItemComponentWrapper = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 10px;
  width: 100%;

  #info-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    margin: 5px;
  }

  h3 {
    padding: 8px;
    margin: 5px;
    font-style: italic;
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
    word-break: break-all;
  }

  p span {
    font-weight: bold;
  }

  #cid {
    flex: 2;
  }
`;
