import { useState } from "react";
import constants from "../../../../util/Constants";
import styled from "styled-components";
import { useDexyStore } from "../../../../store";
import DurationInputWithFloatingBox from "../../../../components/layout/durationInput/DurationInputWithFloatingBox"

function CreateTab() {
  const { ftdCid, setFtdCid, nodeInfo } = useDexyStore();

  const [reward, setReward,] = useState("");
  const [duration, setDuration,] = useState("");
  const [proofProbability, setProofProbability,] = useState("");
  const [manualProbability, setManualProbability] = useState("");
  const [collateral, setCollateral,] = useState("");
  const [error, setError] = useState("");

  const [isBoxOpen, setBoxOpen] = useState(false);

  const toggleBox = () => {
    setBoxOpen(!isBoxOpen);
  };

  const handleDurationChange = (newDuration: { days: number; hours: number; minutes: number; seconds: number }) => {
    const { days, hours, minutes, seconds } = newDuration;
    const totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    setDuration(totalSeconds.toString());
  };

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
          alert("Successfully created storage offer!");
          setError("");
        } else {
          response.text().then((text) => {
            setError(text);
          }).catch((error) => {
            console.error("Error reading response body:", error);
            setError("Failed to read response body");
          });
        }
      })
      .catch((error) => {
        console.error("Error creating storage offer:", error);
        setError("Failed to create storage offer");
      });
  }

  return (
    <>
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
        <div>
          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onClick={toggleBox}
            >
          </input>
        </div>
        <DurationInputWithFloatingBox isOpen={isBoxOpen} onClose={toggleBox} onDurationChange={handleDurationChange} />
        <div id="divider"></div>
        <input
          type="text"
          placeholder="collateral"
          onChange={(e) => setCollateral(e.target.value)}
        />
        <button onClick={() => upload(ftdCid)}>Download</button>
      </CreateTabWrapper>
      {error && (
        <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {error}
        </p>
      )}
    </>
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

const CustomDropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
  `;

const DropdownContent = styled.div`
  display: block;
  position: absolute;
  background-color: #555555;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 4;
  right: 0;
  `;

const DropdownOption = styled.div`
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
  `;