enum RequestForStorageContractStatus {
    UPLOADING = "UPLOADING",
    UPLOADED = "UPLOADED",
    FAILED = "FAILED",
}

type RequestForStorageContractModel = {
    purchaseid: string;
    lastModified: string;
    reward: string;
    duration: string;
    collateral: string;
    status: RequestForStorageContractStatus;
};

export default RequestForStorageContractModel;
export { RequestForStorageContractStatus };
