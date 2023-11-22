enum UploadedItemStatus {
  UPLOADING = "UPLOADING",
  UPLOADED = "UPLOADED",
  FAILED = "FAILED",
}

type UploadedItemModel = {
  cid: string;
  manifest: Manifest;
};

type Manifest = {
  treeCid: string;
  datasetSize: number;
  blockSize: number;
  protected: boolean;
};

export default UploadedItemModel;
export { UploadedItemStatus };
