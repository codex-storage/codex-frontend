import { useState } from "react";
import constants from "../../../../util/Constants";
import styled from "styled-components";
import { useDexyStore } from "../../../../store";

function CreateTab() {
  const { ftdCid, setFtdCid, nodeInfo } = useDexyStore();

  const [reward, setReward,] = useState("file");
  const [duration, setDuration,] = useState("file");
  const [proofProbability, setProofProbability,] = useState("file");
  const [collateral, setCollateral,] = useState("file");
  

  function upload(cid: string) {
    fetch(
      `/api/codex/v1/storage/request/${cid}`,
      {
        method: 'POST',
        headers:
          (nodeInfo.auth !== null && {
            Authorization:
              (nodeInfo.auth && "Basic " + btoa(nodeInfo.auth)) || "",
          }) ||
          {},
        body: JSON.stringify({
          reward: reward,
          duration: duration,
          proofProbability: proofProbability,
          collateral: collateral
        })
      }
    )
    // create a popup in the browser to show if the upload was successful
    .then((response) => {
        if (response.status === 200) {
          alert("Upload successful!");
        } else {
          alert("Upload failed!");
        }
      })
  }

  return (
    <CreateTabWrapper>
      <input
        type="text"
        placeholder="CID"
        onChange={(e) => {
          setFtdCid(e.target.value);
        }}
        value={ftdCid}
      />
      <div id="divider"></div>
      <input
        type="text"
        placeholder="Reward"
        onChange={(e) => setReward(e.target.value)}
      />
      <div id="divider"></div>
      <input
        type="text"
        placeholder="Duration"
        onChange={(e) => setDuration(e.target.value)}
      />
      <div id="divider"></div>
      <input
        type="text"
        placeholder="ProofProbability"
        onChange={(e) => setProofProbability(e.target.value)}
      />
      <div id="divider"></div>
      <input
        type="text"
        placeholder="collateral"
        onChange={(e) => setCollateral(e.target.value)}
      />
      <button onClick={() => upload(ftdCid)}>Download</button>
    </CreateTabWrapper>
  );
}

export default CreateTab;

const CreateTabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 75%;

  input {
    flex: 3;
    height: 60px;
    padding: 10px 20px;
    border: none;
    background-color: ${constants.surfaceColor};
    color: ${constants.onSurfaceColor};
    width: 100%;
  }

  input:focus {
    outline: none;
    border: 2px solid ${constants.primaryColor};
  }

  input:nth-child(1) {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  #divider {
    width: 2.5px;
    height: 60px;
    background-color: #555555;
  }

  button {
    flex: 2;
    height: 60px;
    border: none;
    background-color: ${constants.primaryColor};
    color: ${constants.onPrimaryColor};
    font-size: 1rem;
    cursor: pointer;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 100%;
  }

  @media (max-width: 1180px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 85%;
  }

  @media (max-width: 450px) {
    width: 90%;
  }
`;
