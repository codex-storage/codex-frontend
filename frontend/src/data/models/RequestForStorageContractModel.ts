type RequestForStorageContractModel = {
    requestId: string;
    request: Request;
    state: string;
    error: string;
};

type Request = {
    client: string;
    ask: Ask;
    content: Content;
    expiry: string;
    nonce: string;
    id: string;
  }
  
  type Ask = {
    slots: number;
    slotSize: string;
    duration: string;
    proofProbability: string;
    reward: string;
    collateral: string;
    maxSlotLoss: number;
  }
  
  type Content = {
    cid: string;
  }

export default RequestForStorageContractModel;