# Codex Frontend Requirements
Here's an attempt to structure the requirements for a Codex frontend application.
For some of the requirements, Codex API may not be available yet. Feel free to contact core contributors.

## Node status
Frontend should display basic node status information.
1. Frontend displays node network information:
    1. Node ID
    1. Node SPR (signed peer record)
    1. Number of known peers
    1. Announce addresses
    1. Codex version information
1. Frontend displays node storage information:
    1. Total storage quota
    1. Storage quota used
    1. Storage quota reserved
    1. (Bonus points) Frontend displays a warning in highlighted colors when the amount of available quota drops below 100MB.
1. Frontend displays hosting information:
    1. Number of slots being hosted
    1. Per slot being hosted:
        1. Status of the contract
        1. Total size of the slot data
        1. Duration of the contract
        1. Amount of collateral posted
        1. Amount of contract reward
1. Frontend displays its public payment account information.
1. Frontend displays its own version information.
1. (Bonus points) Frontend will periodically update the network, storage, and hosting information.

## Local data exchange
Frontend allows users to upload and download data.
1. Frontend displays datasets stored in the local node.
1. For each dataset stored locally, frontend displays:
    1. CID of the dataset
    1. Size of the dataset
    1. Expiration timestamp of the dataset
1. Frontend allows user to upload a file to the node.
1. Frontend will provide user-feedback while an upload is in progress.
1. Frontend will display the CID of the uploaded file when upload is finished.
1. Frontend allows users to download a file given a CID.
1. Frontend will provide user-feedback while a download is in progress.
1. Frontend will display a clear error message when upload fails.
1. Frontend will display a clear error message when download fails.

## Marketplace - Hosting
Frontend allows the user to offer their local diskspace to the network. Such an offering is called an "Availability".
1. Frontend displays current availabilities.
1. Frontend displays per availablility: 
    1. Size
    1. Maximum contract duration
    1. Maximum collateral
    1. Minimum price
    1. (Bonus points) Slots currently being served by this availability
1. Frontend allows user to create new availabilities.
1. Frontend allows user to remove availabilities.
1. Frontend displays user-feedback when performing either of these operations.
1. Frontend displays a clear error message when either of these operations fail.

## Marketplace - Purchasing
Frontend allows the user to purchase storage space in the network.
1. Frontend displays current purchases.
1. Frontend displays per purchase:
    1. ID of the purchase
    1. Dataset CID
    1. Size
    1. Total contract duration + Contract end timestamp + remaining contract time
    1. Amount of Collateral posted
    1. Price paid for purchase
1. (Bonus points) When a purchase remaining time drops below 8 hours, frontend will use highlight colors to passively alert user to approaching expirey.
1. Frontend allows user to create a new purchase for a CID.
1. (Bonus points) Frontend allows users to 'quickly' set up a new purchase from a single icon button in each element of the local-content overview list, pre-filling the CID.
