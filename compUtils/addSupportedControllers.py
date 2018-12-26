import os
import json
from utilsFuncs import newOrginizeJson

path = os.path.dirname(os.path.dirname(__file__)) + '/components/Blocks'
tsvFile = os.path.dirname(__file__) + '/' + 'supportedControllers.tsv'


f =  open(tsvFile, 'r')


# create a dict of comps by name to update json files
firstLine = f.readline()
keys = firstLine[:-1].split('\t')[:4]

compById = {}
for line in f:
    # print(line)
    
    comp = line[:-1].split('\t')
    name = comp[0]
    compById[name] = {keys[2] : comp[2], keys[3]: comp[3]}
    
# import pdb; pdb.set_trace()
    
for (dirpath, dirnames, filenames) in os.walk(path):
    
    for filename in filenames:
        if filename.endswith('.json'): 

            print(filename)

            json_data=open(dirpath + '/' + filename).read()
            data = json.loads(json_data)
            
            supCont = data.get('supportedControllers')
            
            if supCont:
                # id = data.get('blockId')
                name = data.get('name')
                if name in compById:
                    for controller, flag in compById[name].items():
                        if flag == 'TRUE':
                            data['supportedControllers'].append(controller)                    
                
                
                    # import pdb; pdb.set_trace()

                    f = open(dirpath + '/' + filename, 'w')
                    f.write(newOrginizeJson(data))
                    f.close()

