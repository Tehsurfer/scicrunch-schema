# scicrunch-schema
Defining the current outputs of scicrunch and what additions ABI-Software would like to add. 

## Current SciCrunch output
SciCrunch currently includes the following 24 parameters:
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
Map core is currently assessing adding a _Visualisation_ object to this list which contains two additional features:
- _List_ of applicable visualisations (strings)
- _URI_ that visualisation collects data from (url string)
_And potentially:_
- _URL_ of the visulasation itself (on data.sparc.science)

## Method of additions
I imagine we have two methods of adding these additions to SciCrunch
### 1. Update all results with visualisation information
This will be **positive** for consistency but the _negative_ is it will require more access to SciCrunch databases to implement.
### 2. Add additional results that are Map-Core specific
The *negative* to this is that we will then have duplicates stored on scicrunch and we will need tools in place to process them (so that we don't display duplicates/

## mapcore.schema.json (proposed)
```yaml
{
  "type": "object",
  "properties": {
    "Dataset Title": { "type": "string", "required": true },
    "Description": { "type": "string" },
    "Example Image": { "type": "string" },
    "Species": { "type": "string" }, 
    "Anatomy": { "type": "array" }, 
    "Visualisation": {
      "type": "array",
      "contatins": {
        "type": "object",
        "properties": {
          "Type": {
            "type": "string", 
            "required": true,
            "pattern": "/(DataViewer|ScaffoldViewer|Flatmap|Simulation)/g"
          },
          "Title": {"type": "string"},
          "Description": {"type": "string"},
          "URI": {
            "type": "string", 
            "required": true,
            "pattern": "/(.*?)\\.(json|csv)(?:$|\n)|(https?:\/\/(www\\.)?osparc\\.io\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*))"
          }
        }
      }
    }
  }
}
```
## Example SciCrunch result 
```yaml
{
  "Dataset Title": "Cell Body Segmentation and Electrophysiology Data: Stellate Ganglion",
  "Description": "Mouse stellate ganglion neuronal cell shape data from...",
  # ... All Scicrunc properties here.
  "Visualisation": [ # (Additional property added by ABI)
    {
      "Type": "ScaffoldViewer",
      "Title": "Stellate Ganglion",
      "Description": "Mapped neuronal cells to a 3d scaffold of a mouse heart",
      "URI": "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/stellate/stellate_metadata.json",
    },
    {
      "Type": "DataViewer",
      "Title": "Stellate Ganglion",
      "Description": "Mapped neuronal cells to a 3d scaffold of a mouse heart",
      "uri": "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/directory-meta.json",
    }
  ]
}
```

## Current Scicrunch API endpoints used by ABI
```python
    url = 'https://scicrunch.org/api/1/dataservices/federation/data/{0}?{1}&{2}'.format(
        data_set, query_string, 'key={}'.format(Config.KNOWLEDGEBASE_KEY, 'utf-8'))
    return get_response_from_remote(url)
```
