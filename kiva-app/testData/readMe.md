### Test Data Overview:


#### Loans:
##### Retrival
Pulled from Kiva Loans API. Documentation located at: https://build.kiva.org/api#GET*|loans|newest.

Notes: Max per_page is 500. For the test data, I iterated through 13 calls. 
Then removed paging structure:
`{"paging":{"page":13,"total":6103,"page_size":500,"pages":13}`
Formatted loans structure to end cleanly for valid-json.

##### MongoDB load
Loaded via:

`mongoimport --db kivaDB -c loans --file loans.json`

#### Corruption Index:
##### Retrieval:
Pulled from https://www.transparency.org, a download of the CPI 2017 XLSX dataset. Standard deviation columns were removed and re-saved as a csv.

#### MongoDB load
Loaded via:

`mongoimport --db kivaDB -c cindex --file corruption-index.csv --type csv --headerline`