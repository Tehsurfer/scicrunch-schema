# processSciCrunch.py: This file aims to demonstrate the differences between using XML arrays and string processing

from xmljson import badgerfish as bf
from xml.etree.ElementTree import fromstring

scicrunch = ' \
    <string-array name="Anatomy"> \
        <item value="abdominal wall" UBERON="UBERON:0003697" /> \
        <item value="celiac ganglion" UBERON="UBERON:0002262" /> \
    </string-array>'

scicrunch_original = ' \
    <data> \
        <name>Anatomy</name> \
        <value>abdominal wall | UBERON:0003697, celiac ganglion | UBERON:0002262</value> \
    </data>'


# If we use xml arrays we can cleanly pull data from the XML
organ = bf.data(fromstring(scicrunch))['string-array']['item'][0]['@value']
print(organ) # 'abdominal wall'


# Without XML arrays, some extra string processing will be needed
value = bf.data(fromstring(scicrunch_original))['data']['value']
organs = [ {'value': r.split('|')[0], 'UBERON': r.split('|')[1]} for r in value.split(',') ]
print(organs) # [{'value': 'abdominal wall ', 'UBERON': ' UBERON:0003697'}, {'value': ' celiac ganglion ', 'UBERON': ' UBERON:0002262'}]
organ = organs[0]['value']
print(organ) #  'abdominal wall '