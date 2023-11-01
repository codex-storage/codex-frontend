import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Convert,
  DebugNodeInfoModel,
} from "../../data/models/DebugNodeInfoModel";
import NodeInfoItemComponent from "../../components/nodeInfoItem/NodeInfoItemComponent";
import Header from "../../components/layout/partials/Header";
import { useDexyStore } from "../../store";
import constants from "../../util/Constants";

function DebugPage() {
  const { nodeInfo } = useDexyStore();

  const [statusInfo, setStatusInfo] = React.useState<
    DebugNodeInfoModel | undefined
  >();
  useEffect(() => {
    axios
      .get(
        `/api/api/codex/v1/debug/info`,
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
        console.log(response.data);
        setStatusInfo(
          Convert.toDebugNodeInfoModel(JSON.stringify(response.data))
        );
      });
  }, [nodeInfo]);

  console.log(statusInfo);
  return (
    <DebugPageWrapper>
      <Header title="Node Info" />
      <main>{statusInfo && <NodeInfoItemComponent data={statusInfo!!} />}</main>
    </DebugPageWrapper>
  );
}

export default DebugPage;

const DebugPageWrapper = styled.div`
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
