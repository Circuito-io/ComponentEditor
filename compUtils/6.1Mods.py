import os
import json
from utilsFuncs import newOrginizeJson

path = os.path.dirname(os.path.dirname(__file__)) + '/components/Blocks'

blocksByName = {}
filesToAdd = []


# # 1. change key: 'circuit' to 'circuits'
# for (dirpath, dirnames, filenames) in os.walk(path):
    
#     for filename in filenames:
#         if filename.endswith('.json'): 
            
#             print(filename)

#             json_data=open(dirpath + '/' + filename).read()
#             data = json.loads(json_data)
            
            
#             if 'circuit' in data:
#                 data['circuits'] = data.pop('circuit')
            
#             f = open(dirpath + '/' + filename, 'w')
#             f.write(newOrginizeJson(data))
#             f.close()
            

# 2. change circuit names
for (dirpath, dirnames, filenames) in os.walk(path):
    
    for filename in filenames:
        if filename.endswith('.json'): 
            
            print(filename)

            json_data=open(dirpath + '/' + filename).read()
            data = json.loads(json_data)
            
            
            if data.get('circuits'):
                for circuit in data.get('circuits'):
                    if data.get('name') in circuit.get('name'):
                        circuit['name'] = circuit['name'].split(data['name'])[-1]
                        for char in ['_','-']:
                            circuit['name'].replace(char,'')
                        print(circuit['name'])
                        # import pdb; pdb.set_trace() 
            
                f = open(dirpath + '/' + filename, 'w')
                f.write(newOrginizeJson(data))
                f.close()

import pdb; pdb.set_trace() 
