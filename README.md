# scicrunch-schema
Defining the current outputs of scicrunch and what additions ABI-Software would like to add. 

## Current SciCrunch output
SciCrunch currently includes the following 16 parameters:
- Dataset Title
- Investigators
- Award Number
- Description
- Anatomy
- Modality
- Species
- Sex
- Keywords
- Subject Count
- Folder Name
- Dataset Completeness Index
- Protocols.io
- Sample Count
- Article DOI
- Example Image
- Contributor Count
- Completeness
- Acknowledgement
- Links
- Age Category
- BlackfynnID
- Dataset Status
- v_uuid


## Mapcore additions
Map core is currently assesing adding a _Visualisation_ object to this list which contains two additional features:
- _List_ of applicable visualisations (strings)
- _URI_ that visualisation collects data from (url string)
_And potentially:_
- _URL_ of the visulasation itself (on data.sparc.science)

## Method of additions
I imagine we have two methods of addin these additions to SciCrunch
### 1. Update all results with visualisation information
This will be **positive** for consistency but the _negative_ is it will require more deeper access to SciCrunch to impolement
## 2. Add additional results that are Map-Core specific
The *negative* to this is that we will then have duplicates stored on scicrunch and we will need tools in place to process them (so that we don't display duplicates

