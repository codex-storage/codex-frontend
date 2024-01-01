export interface NodeInfoModel {
    totalBlocks: number;
    quotaMaxBytes: number;
    quotaUsedBytes: number;
    quotaReservedBytes: number;
  }

  export class Convert {
    public static toNodeInfoModel(json: string): NodeInfoModel {
      return JSON.parse(json);
    }
}