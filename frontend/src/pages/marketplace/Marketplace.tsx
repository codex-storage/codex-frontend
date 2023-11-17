import React from "react";
import TabBarView from "../../components/layout/tabBarView/TabBarView";
import styled from "styled-components";

import { MdFileUpload, MdFileDownload } from "react-icons/md";
import UploadTab from "./tabs/status/StatusTab";
import DownloadTab from "./tabs/create/CreateTab";
import StatusTab from "./tabs/status/StatusTab";
import CreateTab from "./tabs/create/CreateTab";

function MarketplacePage() {
  return (
    <div>
      <TabBarView tabIcons={[MdFileUpload, MdFileDownload, MdFileUpload, MdFileDownload]}>
        <StatusTab />
        <TabBarViewPage>
          <CreateTab />
        </TabBarViewPage>
      </TabBarView>
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
