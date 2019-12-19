// This file is an example of the technique we currently use to add neccissary data to SciCrunch results
// The most important take away is the use of Blackfynn ID's to reference datasets


exports.mapcore_augmented_results_module = function()  {

  const search_alternatives = ["HB_150A_2", "HB_155A_1", "HB_150A_4", "HB_155A_1", "HB_155A_2", "HB_155A_3",
    "HB_155A_4", "HB_100A_2", "HB_100A_3", "HB_100A_4", "HB_115B_1", "HB_150A_1", "HB_115B_4", "HB_115B_3", "HB_115B_2"];

  this.isKnownSearchTermNotInKnowledgeBase = (term) => {
    let is_not_in = false;
    if (term === "flatmap") {
      is_not_in = true
    } else if (term.includes("8297 V Stom")) {
      is_not_in = true
    }

    return is_not_in
  };

  this.modifySearchTerm = (term) => {
    let search_term = term;
    if (search_alternatives.indexOf(term) > -1) {
      search_term = "UBERON:0000948"
    }

    return search_term;
  };

  this.augment = (data, params) => {
    let sorted_data = [];
    if (data) {
      for (let i = 0; i < data.length; i++) { //https://app.blackfynn.io/N:organization:618e8dd9-f8d2-4dc4-9abb-c6aaab2e78a0/datasets/N:dataset:0170271a-8fac-4769-a8f5-2b9520291d03
        let blackfynn_id = data[i]['BlackfynnID'];
        if (blackfynn_id.includes('N:organization:618e8dd9-f8d2-4dc4-9abb-c6aaab2e78a0') &&
          blackfynn_id.includes('N:dataset:0170271a-8fac-4769-a8f5-2b9520291d03')) {
          data[i]['Example Image'] = 'https://sparc.biolucida.net:443/image?c=MzI2LWNvbC0zMi0wLTAtMS0w';
          data[i]['Scaffold'] = {
            'uri': 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/use_case4/rat_heart_metadata.json',
            'species': 'Rat',
            'organ': 'heart',
            'annotation': 'UBERON:0000948'
          };
          data[i]['DataViewer'] = {
            'uri': 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/use-case-4/RNA_Seq.csv',
            'species': 'Rat',
            'organ': 'heart',
            'annotation': 'UBERON:0000948'
          };
          sorted_data.unshift(data[i])
        } else if (blackfynn_id.includes('N:organization:618e8dd9-f8d2-4dc4-9abb-c6aaab2e78a0') &&
          blackfynn_id.includes('N:dataset:e19b9b69-6776-427a-92f4-6b03f395d01f')) {
          data[i]['Example Image'] = 'https://sparc.biolucida.net:443/image?c=MTIxLWNvbC0zMi0wLTAtMS0w';
          sorted_data.unshift(data[i])
        } else if (blackfynn_id.includes('N:organization:618e8dd9-f8d2-4dc4-9abb-c6aaab2e78a0') &&
          blackfynn_id.includes('N:collection:92dab90c-5b45-4e90-8697-4299a40849b2')) {
          data[i]['Example Image'] = 'https://sparc.biolucida.net:443/image?c=MTA4LWNvbC0zMi0wLTAtMi0w';
          sorted_data.unshift(data[i])
        } else if (blackfynn_id.includes('N:organization:618e8dd9-f8d2-4dc4-9abb-c6aaab2e78a0') &&
          blackfynn_id.includes('N:dataset:5fbf98f1-b908-469a-8d97-913dc1cbd26d')) {
          data[i]['Example Image'] = 'https://sparc.biolucida.net:443/image?c=MjAwLWNvbC0zMi0wLTAtMS0w';
          sorted_data.unshift(data[i])
        } else if (blackfynn_id.includes('N:organization:618e8dd9-f8d2-4dc4-9abb-c6aaab2e78a0') &&
          blackfynn_id.includes('N:collection:9f088d62-8317-4059-9f99-cb94a69f337b')) {
          data[i]['Example Image'] = 'https://sparc.biolucida.net:443/image?c=MTIzLWNvbC0zMi0wLTAtMS0w';
          sorted_data.unshift(data[i])
        } else if (blackfynn_id.includes('N:organization:618e8dd9-f8d2-4dc4-9abb-c6aaab2e78a0') &&
          blackfynn_id.includes('N:dataset:e4bfb720-a367-42ab-92dd-31fd7eefb82e')) {
          data[i]['Scaffold'] = {
            'uri': 'https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/stomach/stomach_metadata.json',
            'species': 'Rat',
            'organ': 'stomach',
            'annotation': 'UBERON:0000945'
          };
          data[i]['Example Image'] = 'https://sparc.biolucida.net:443/image?c=MTY0LWNvbC0zMi0wLTAtMi0w';
          sorted_data.unshift(data[i])
        } else {
          sorted_data.push(data[i])
        }
      }
      if (params.q.toUpperCase().includes("HEART") || params.q === "UBERON:0000948") {
        sorted_data.unshift({
            "Dataset Title": "Autonomic Nerve Stimulation Simulation",
            "Description": "This data links to a simulation experiment of the autonomic nerves innervating the heart.",
            "Example Image": "",
            "Simulation": {
              "uri": "https://osparc.io/study/194bb264-a717-11e9-9dff-02420aff2767",
              'species': 'Human',
              'organ': 'heart',
              'annotation': 'UBERON:0000948',
              'name': 'Autonomic Nerve Stimulation'
            }
          }
        )
      }
      if (params.q.toUpperCase().includes("STELLATE") || params.q === "UBERON:0002440") {
        sorted_data.unshift({
            "Dataset Title": "Cell Body Segmentation and Electrophysiology Data: Stellate Ganglion",
            "Description": "Mouse stellate ganglion neuronal cell shape data from the Shivkumar/Tompkins group are displayed in a 3D stellate scaffold. 15 neurons, including their cell bodies, axons and dendrites, are displayed on five cross-sections of the stellate with the high resolution image displayed as a texture map. Electrophysiological data from these cells can be visualized by clicking on the cell. Note that the scaffold in this example is a geometrically simple shape designed to register the images in the appropriate anatomical location. The shape of the scaffold will be improved once more data are available to define the stellate boundaries.",
            "Example Image": "",
            "Scaffold": {
              "uri": "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/stellate/stellate_metadata.json",
              'species': 'Mouse',
              'organ': 'nerve',
              'annotation': 'UBERON:0002440'
            },
            "DataViewer": {
              "uri": "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/csv-data/stellate/directory-meta.json",
              'species': 'Mouse',
              'organ': 'nerve',
              'annotation': 'UBERON:0002440'
            }
          }
        )
      }
      if (params.q.toUpperCase().includes("LUNG") || params.q === "UBERON:0002048") {
        sorted_data.unshift({
            "Dataset Title": "Data for Mouse Lungs",
            "Description": "Data from Tom Taylor-Clark visualised on a 3D scaffold with electrophysiclogical data.",
            "Example Image": "",
            "Scaffold": {
              "uri": "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/lungs/lungs_metadata.json",
              'species': 'Mouse',
              'organ': 'lung',
              'annotation': 'UBERON:0002048'
            }
          }
        )
      }
      if (params.q.toUpperCase().includes("COLON") || params.q === "UBERON:0001155") {
        sorted_data.unshift({
            "Dataset Title": "Mouse Colon Data",
            "Description": "Data from the Howard & Tache groups where a 3D scaffold fitted to these data will be visualised on a 3D scaffold.",
            "Example Image": "",
            "Scaffold": {
              "uri": "https://mapcore-bucket1.s3-us-west-2.amazonaws.com/ISAN/scaffold/colon/colon_metadata.json",
              'species': 'Mouse',
              'organ': 'colon',
              'annotation': 'UBERON:0001155'
            }
          }
        )
      }
    } else if (params.q === 'flatmap') {
      sorted_data = pre_packaged_results.get_flatmap_results()
    } else if (params.q.includes("8297 V Stom")) {
      sorted_data = [];
      if (params.q.includes("39.0um")) {
        sorted_data[0] = {
          "BlackfynnID": "",
          "Dataset Title": "3D Mapping and Visualization of 2D Experimental Data Stomach Afferents and Efferents Image 39.0um",
          "Description": "A statistically representative and anatomically-based 3D scaffold of the rat stomach was created to map 230 nerve ending pathways traced from 68 2D rat stomach whole mounts. Micro-CT image data of 11 animals with an average volume of 9.9cm3 were used to construct this 3D scaffold. Imaging and subsequent data segmentation was performed at the Powley laboratory in Purdue University using MBF bioscience software Neurolucida.",
          "Example Image": "https://sparc.biolucida.net/image?c=MTY0LWNvbC0zMi0wLTAtMi0w",
        }
      } else if (params.q.includes("20um")) {
        sorted_data[0] = {
          "BlackfynnID": "",
          "Dataset Title": "3D Mapping and Visualization of 2D Experimental Data Stomach Afferents and Efferents Image 20um",
          "Description": "A statistically representative and anatomically-based 3D scaffold of the rat stomach was created to map 230 nerve ending pathways traced from 68 2D rat stomach whole mounts. Micro-CT image data of 11 animals with an average volume of 9.9cm3 were used to construct this 3D scaffold. Imaging and subsequent data segmentation was performed at the Powley laboratory in Purdue University using MBF bioscience software Neurolucida.",
          "Example Image": "https://sparc.biolucida.net/image?c=MTY1LWNvbC0zMi0wLTAtMi0w",
        }
      } else if (params.q.includes("16.0um")) {
        sorted_data[0] = {
          "BlackfynnID": "",
          "Dataset Title": "3D Mapping and Visualization of 2D Experimental Data Stomach Afferents and Efferents Image 16.0um",
          "Description": "A statistically representative and anatomically-based 3D scaffold of the rat stomach was created to map 230 nerve ending pathways traced from 68 2D rat stomach whole mounts. Micro-CT image data of 11 animals with an average volume of 9.9cm3 were used to construct this 3D scaffold. Imaging and subsequent data segmentation was performed at the Powley laboratory in Purdue University using MBF bioscience software Neurolucida.",
          "Example Image": "https://sparc.biolucida.net/image?c=MTY2LWNvbC0zMi0wLTAtMS0w",
        }
      }
    }
    return sorted_data
  };

  const initialise = () => {
  };

  initialise();
};
