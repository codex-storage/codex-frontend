import { useState } from "react";
import constants from "../../../../util/Constants";
import styled from "styled-components";
import { useDexyStore } from "../../../../store";
import DurationInputWithFloatingBox from "../../../../components/layout/durationInput/DurationInputWithFloatingBox"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import exp from "constants";

function CreateTab() {
  const { ftdCid, setFtdCid, nodeInfo } = useDexyStore();

  const [reward, setReward,] = useState("");
  const [duration, setDuration,] = useState("");
  const [proofProbability, setProofProbability,] = useState("");
  const [expiry, setExpiry] = useState("")
  const [nodes, setNodes] = useState("")
  const [tolerance, setTolerance] = useState("")
  const [collateral, setCollateral] = useState("");
  const [error, setError] = useState("");

  const [isBoxOpenDuration, setBoxOpenDuration] = useState(false);
  const [isBoxOpenExpiry, setBoxOpenExpiry] = useState(false);

  const toggleBoxDuration = () => {
    setBoxOpenDuration(!isBoxOpenDuration);
  };

  const toggleBoxExpiry = () => {
    setBoxOpenExpiry(!isBoxOpenExpiry);
  };

  const handleExpiryChange = (newDuration: { days: number; hours: number; minutes: number; seconds: number }) => {
    const { days, hours, minutes, seconds } = newDuration;
    const totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    const timestamp = moment().unix() + totalSeconds;
    setExpiry(timestamp.toString());
  };

  const handleDurationChange = (newDuration: { days: number; hours: number; minutes: number; seconds: number }) => {
    const { days, hours, minutes, seconds } = newDuration;
    const totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    
    if (totalSeconds >= 60 && totalSeconds <= 86400) {
      setDuration(totalSeconds.toString());
    }
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
          duration: duration,
          proofProbability: proofProbability,
          reward: reward,
          expiry: expiry,
          nodes: nodes,
          tolerance: tolerance,
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

  const handleProofProbabilityChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || (value >= 0 && value <= 99)) {
      setProofProbability(value);
    }
  };

  return (
    <>
      <DurationInputWithFloatingBox isOpen={isBoxOpenDuration} onClose={toggleBoxDuration} onDurationChange={handleDurationChange} />
      <DurationInputWithFloatingBox isOpen={isBoxOpenExpiry} onClose={toggleBoxExpiry} onDurationChange={handleExpiryChange} />
      <CreateTabWrapper>
        <div className="row">
          <div className="field">
            <label>CID</label>
            <input
              type="text"
              placeholder="CID"
              onChange={(e) => {
                setFtdCid(e.target.value);
              }}
              value={ftdCid}
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Duration</label>
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onClick={toggleBoxDuration}
            />
          </div>
          <div className="field">
            <label>Expiry</label>
            <input
              type="text"
              placeholder="Expiry"
              value={expiry}
              onClick={toggleBoxExpiry}
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Reward</label>
            <input
              type="text"
              placeholder="Reward"
              onChange={(e) => setReward(e.target.value)}
              value={reward}
            />
          </div>
          <div className="field">
            <label>Nodes</label>
            <input
              type="text"
              placeholder="Nodes"
              onChange={(e) => {
                setNodes(e.target.value);
              }}
              value={nodes}
            />
          </div>
          <div className="field">
            <label>Tolerance</label>
            <input
              type="text"
              placeholder="Tolerance"
              onChange={(e) => {
                setTolerance(e.target.value);
              }}
              value={tolerance}
            />
          </div>
          <div className="field">
            <label>Collateral</label>
            <input
              type="text"
              placeholder="Collateral"
              onChange={(e) => setCollateral(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label>Proof Probability</label>
            <div>
            <select
              value={proofProbability}
              onChange={handleProofProbabilityChange}
            >
              <option value="">Select Proof Probability</option>
              <option value="1">Low Durability Guarantee</option>
              <option value="3">Medium Durability Guarantee</option>
              <option value="6">Strong Durability Guarantee</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Custom Proof Probability"
            value={proofProbability}
            onChange={handleProofProbabilityChange}
          />
          </div>
          <button onClick={() => upload(ftdCid)}>Create</button>
        </div>

      </CreateTabWrapper>
      {error && (
        <p style={{ color: "red", marginTop: "0px", textAlign: "center" }}>
          {error}
        </p>
      )}
    </>
  );
}

export default CreateTab;

const CreateTabWrapper = styled.div`
flex: 1;
display: flex;
flex-direction: column;

main {
  display: flex;
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
  align-items: center;
  justify-content: center;
  background-color: #141414;
  border-radius: 8px;
  width: 50%;
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.field {
  display: flex;
  align-items: left;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0px 4px;
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
  height: 50%;
  width: 50%;
  margin-top: 40px;
  border: none;
  background-color: ${constants.primaryColor};
  color: ${constants.onPrimaryColor};
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
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