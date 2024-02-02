import { useState } from "react";
import constants from "../../../../util/Constants";
import styled from "styled-components";
import { useDexyStore } from "../../../../store";
import DurationInputWithFloatingBox from "../../../../components/layout/durationInput/DurationInputWithFloatingBox"

function OfferStorage() {
  const { ftdCid, setFtdCid, nodeInfo } = useDexyStore();

  const [size, setSize,] = useState("");
  const [duration, setDuration,] = useState("");
  const [minPrice, setMinPrice,] = useState("");
  const [maxCollateral, setMaxCollateral,] = useState("");
  const [error, setError] = useState("");

  const [isBoxOpen, setBoxOpen] = useState(false);

  const toggleBox = () => {
    setBoxOpen(!isBoxOpen);
  };

  const handleDurationChange = (newDuration: { days: number; hours: number; minutes: number; seconds: number }) => {
    const { days, hours, minutes, seconds } = newDuration;
    const totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setDuration(totalSeconds.toString());
    }
  };


  function upload(cid: string) {
    fetch(
      `/api/codex/v1/sales/availability`,
      {
        method: 'POST',
        headers:
          (nodeInfo.auth !== null && {
            Authorization:
              (nodeInfo.auth && "Basic " + btoa(nodeInfo.auth)) || "",
          }) ||
          {},
        body: JSON.stringify({
          size: size,
          duration: duration,
          minPrice: minPrice,
          maxCollateral: maxCollateral,
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
      <DurationInputWithFloatingBox isOpen={isBoxOpen} onClose={toggleBox} onDurationChange={handleDurationChange} />
      <OfferStorageWrapper>
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
            <label>Size</label>
            <input
              type="text"
              placeholder="Size (seconds)"
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Duration</label>
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onClick={toggleBox}
            >
            </input>
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label>Minimum Price</label>
            <input
              type="text"
              placeholder="MinPrice"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label>Maximum Collateral</label>
            <input
              type="text"
              placeholder="MaxCollateral"
              onChange={(e) => setMaxCollateral(e.target.value)}
            />
          </div>
          <button onClick={() => upload(ftdCid)}>Create</button>
        </div>
      </OfferStorageWrapper>
      {error && (
        <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {error}
        </p>
      )}
    </>
  );
}

export default OfferStorage;

const OfferStorageWrapper = styled.div`
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
  margin-top: 20px;
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