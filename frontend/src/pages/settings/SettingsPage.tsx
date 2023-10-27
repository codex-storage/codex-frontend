import React from "react";
import styled from "styled-components";
import Header from "../../components/layout/partials/Header";
import constants from "../../util/Constants";
import { useDexyStore } from "../../store";

function SettingsPage() {
  const { nodeInfo, setNodeInfo } = useDexyStore();

  const [nodeInfoInput, setNodeInfoInput] = React.useState({
    nodeBaseUrl: nodeInfo.baseUrl,
    nodeToConnectTo: nodeInfo.nodeToConnectTo,
    nodeId: nodeInfo.id,
    // nodeIp: nodeInfo.ip,
    nodeAddress: nodeInfo.address,
    auth: nodeInfo.auth,
  });

  async function connectOnSave(params: {
    baseUrl: string;
    nodeToConnectTo: string | null;
    id: string | null;
    // ip: string | null;
    address: string | null;
    auth: string | null;
  }): Promise<void> {
    if (
      params.id === null ||
      // params.ip === null ||
      params.address === null
    ) {
      return;
    }
    try {
      await fetch(
        `http://localhost:8080/api/codex/v1/connect/${encodeURIComponent(
          params.id
        )}?addrs=${encodeURIComponent(params.address)}`
      )
        .then((response) => response.status)
        .then((status) => {
          console.log(status);
          if (status === 200) {
            alert("Successfully connected to node!");
          } else {
            alert("Failed to connect to node!");
          }
        });
    } catch (error) {
      console.error(error);
      alert("Failed to connect to node!");
    }
  }

  return (
    <SettingsPageWrapper>
      <Header title="Settings" />
      <main>
        <div className="inputs">
          <h4>Connection Settings</h4>
          <input
            type="text"
            placeholder="Local node base URL (default is http://localhost:8080)"
            value={nodeInfoInput.nodeBaseUrl}
            onChange={(e) =>
              setNodeInfoInput({
                ...nodeInfoInput,
                nodeBaseUrl: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Node to connect to (blank for local node) (e.g. http://example.com:8080))"
            value={nodeInfoInput.nodeToConnectTo || ""}
            onChange={(e) =>
              setNodeInfoInput({
                ...nodeInfoInput,
                nodeToConnectTo: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Node ID (blank for local node)"
            value={nodeInfoInput.nodeId || ""}
            onChange={(e) =>
              setNodeInfoInput({ ...nodeInfoInput, nodeId: e.target.value })
            }
          />
          {/* <input
            type="text"
            placeholder="Node IP (blank for local node)"
            value={nodeInfoInput.nodeIp || ""}
            onChange={(e) =>
              // setNodeInfoInput({ ...nodeInfoInput, nodeIp: e.target.value })
            }
          /> */}
          <input
            type="text"
            placeholder="Node Address (blank for local node)"
            value={nodeInfoInput.nodeAddress || ""}
            onChange={(e) =>
              setNodeInfoInput({
                ...nodeInfoInput,
                nodeAddress: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Node Auth (blank for local node) (e.g. username:password)"
            value={nodeInfoInput.auth || ""}
            onChange={(e) =>
              setNodeInfoInput({ ...nodeInfoInput, auth: e.target.value })
            }
          />
          <button
            onClick={() => {
              connectOnSave({
                baseUrl: nodeInfoInput.nodeBaseUrl,
                nodeToConnectTo: nodeInfoInput.nodeToConnectTo,
                id: nodeInfoInput.nodeId,
                // ip: nodeInfoInput.nodeIp,
                address: nodeInfoInput.nodeAddress,
                auth: nodeInfoInput.auth,
              }).then(() => {
                setNodeInfo({
                  baseUrl: nodeInfoInput.nodeBaseUrl,
                  nodeToConnectTo: nodeInfoInput.nodeToConnectTo,
                  id: nodeInfoInput.nodeId,
                  // ip: nodeInfoInput.nodeIp,
                  address: nodeInfoInput.nodeAddress,
                  auth: nodeInfoInput.auth,
                });
              });
            }}
          >
            <span>Save</span>
          </button>
        </div>
      </main>
    </SettingsPageWrapper>
  );
}

export default SettingsPage;

const SettingsPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 16px 0px;
  }

  h1 {
    color: ${constants.onSurfaceColor};
    font-size: 24px;
    margin: 16px;
  }

  .inputs {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #141414;
    border-radius: 8px;
    width: 50%;
  }

  h4 {
    color: ${constants.onSurfaceColor};
    font-size: 20px;
    margin: 16px;
  }

  input {
    height: 60px;
    padding: 10px 20px;
    border: none;
    background-color: ${constants.surfaceColor};
    color: ${constants.onSurfaceColor};
    width: 100%;
    border-radius: 8px;
    margin: 16px 0px;
    border: 2px dashed #9e9e9e;
    border-radius: 8px;
    text-align: center;
  }

  input:focus {
    outline: none;
    border: 2px solid ${constants.primaryColor};
  }

  button {
    height: 40px;
    border: none;
    background-color: ${constants.primaryColor};
    color: ${constants.onPrimaryColor};
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    width: 80px;
  }

  button span {
    font-weight: bold;
  }

  @media (max-width: 1180px) {
    .inputs {
      width: 80%;
    }
  }

  @media (max-width: 768px) {
    .inputs {
      width: 85%;
    }
  }

  @media (max-width: 450px) {
    .inputs {
      width: 90%;
    }
  }
`;
