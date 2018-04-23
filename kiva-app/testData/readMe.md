### Test Data Overview:


#### Loans:
##### Retrival
Pulled from Kiva Loans API. Documentation located at: https://build.kiva.org/api#GET*|loans|newest.

Notes: Max per_page is 500. For the test data, I iterated through 13 calls. 
Then removed paging structure:
`{"paging":{"page":13,"total":6103,"page_size":500,"pages":13}`
Formatted loans structure to end cleanly for valid-json.

##### MongoDB load
Loaded into an initial collection for parsing by script:

`mongoimport --db kivaDB -c testData --file loans.json`