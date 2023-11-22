import React from "react";
import styled from "styled-components";

function TabBarViewText(props: {
  tabText: String[];
  children: React.ReactNode[];
}) {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <TabBarViewTextWrapper>
      <div id="tab-wrapper">
        {props.tabText.map((text, index) => (
          <button
            style={{
              color: activeTab === index ? "#6f11db" : "#9e9e9e",
              borderBottom: activeTab === index ? "2px solid #6f11db" : "none",
            }}
            onClick={() => setActiveTab(index)}
            key={index}
          >
            {text}
          </button>
        ))}
      </div>
      <div id="tab-view">{props.children[activeTab]}</div>
    </TabBarViewTextWrapper>
  );
}

export default TabBarViewText;

const TabBarViewTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 0;
  margin: 0;
  height: 100%;

  #tab-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
    width: 100%;
  }

  #tab-wrapper button {
    flex: 1;
    background-color: #141414;
    color: #9e9e9e;
    border: none;
    padding: 24px;
    cursor: pointer;
    font-size: 1rem;
  }

  #tab-view {
    height: 100%;
    width: 100%;
  }

  @media (min-width: 768px) {
    height: 100vh - 300px !important;
  }
`;
