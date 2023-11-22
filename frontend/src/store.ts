import { create } from "zustand";
import { persist } from "zustand/middleware";
import UploadedItemModel from "./data/models/UploadedItemModel";
import RequestForStorageContractModel from "./data/models/RequestForStorageContractModel";
import AvailabilityModel from "./data/models/AvailabilityModel";
interface NodeInfo {
  baseUrl: string;
  nodeToConnectTo: string | null;
  id: string | null;
  // ip: string | null;
  address: string | null;
  auth: string | null;
}

interface DexyState {
  uploads: UploadedItemModel[];
  setUploads: (uploads: UploadedItemModel[]) => void;
  storageRequests: RequestForStorageContractModel[];
  setStorageRequests: (storageRequests: RequestForStorageContractModel[]) => void;
  storageOffers: AvailabilityModel[];
  setStorageOffers: (storageOffers: AvailabilityModel[]) => void;
  ftdCid: string;
  setFtdCid: (cid: string) => void;
  nodeInfo: NodeInfo;
  setNodeInfo: (nodeInfo: NodeInfo) => void;
}

export const useDexyStore = create<DexyState>()(
  persist(
    (set, get) => ({
      uploads: [],
      setUploads: (uploads) => set({ uploads }),
      storageRequests: [],
      setStorageRequests: (storageRequests) => set({ storageRequests }),
      storageOffers: [],
      setStorageOffers: (storageOffers) => set({ storageOffers }),
      ftdCid: "",
      setFtdCid: (cid) => set({ ftdCid: cid }),
      nodeInfo: {
        baseUrl: "http://host.docker.internal:8080",
        nodeToConnectTo: null,
        id: null,
        // ip: null,
        address: null,
        auth: null,
      },
      setNodeInfo: (nodeInfo) => set({ nodeInfo }),
    }),
    {
      name: "dexy-storage",
    }
  )
);
