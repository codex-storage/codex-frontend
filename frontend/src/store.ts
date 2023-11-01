import { create } from "zustand";
import { persist } from "zustand/middleware";
import UploadedItemModel from "./data/models/UploadedItemModel";

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
      ftdCid: "",
      setFtdCid: (cid) => set({ ftdCid: cid }),
      nodeInfo: {
        baseUrl: "http://localhost",
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
