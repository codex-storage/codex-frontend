import React from "react";
import TabBarViewText from "../../components/layout/tabBarView/TabBarViewText";
import styled from "styled-components";

import { MdFileUpload, MdFileDownload } from "react-icons/md";
import UploadTab from "./tabs/Rosc/StatusTab";
import DownloadTab from "./tabs/Rosc/CreateTab";
import StatusTab from "./tabs/Rosc/StatusTab";
import CreateTab from "./tabs/Rosc/CreateTab";
import OfferStorage from "./tabs/Availability/OfferStorage";
import AvailabilitiesTab from "./tabs/Availability/Availability";

function MarketplacePage() {
  return (
    <div>
      <TabBarViewText tabText={["ROSC Status", "ROSC create", "Availabilities", "Create Availability"]}>
        <StatusTab />
        <TabBarViewPage>
          <CreateTab />
        </TabBarViewPage>
        <TabBarViewPage>
          <AvailabilitiesTab />
        </TabBarViewPage>
        <TabBarViewPage>
          <OfferStorage />
        </TabBarViewPage>
      </TabBarViewText>
    </div>
  );
}

export default MarketplacePage;

const TabBarViewPage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
