import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Convert,
  NodeInfoModel,
} from "../../data/models/NodeInfoModel";
import NodeInfoItemComponent from "../../components/nodeInfoItem/NodeInfoItemComponent";
import Header from "../../components/layout/partials/Header";
import { useDexyStore } from "../../store";

function NodeInfoPage() {
  const { nodeInfo } = useDexyStore();

  const [statusInfo, setStatusInfo] = React.useState<
    NodeInfoModel | undefined
  >();
  useEffect(() => {
    axios
      .get(
        `/api/codex/v1/space`,
        {
          headers:
            (nodeInfo.auth && {
              Authorization:
                (nodeInfo.auth && "Basic " + btoa(nodeInfo.auth)) || "",
            }) ||
            {},
        }
      )
      .then((response) => {
        setStatusInfo(
          Convert.toNodeInfoModel(JSON.stringify(response.data))
        );
      });
  }, [nodeInfo]);

  console.log(statusInfo);
  return (
    <NodeInfoPageWrapper>
      <Header title="Node Info" />
      <main>{statusInfo && <NodeInfoItemComponent data={statusInfo!!} />}</main>
    </NodeInfoPageWrapper>
  );
}

export default NodeInfoPage;

const NodeInfoPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  main {
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .scroll {
  }
`;
