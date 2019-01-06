import os
import json
from utilsFuncs import newOrginizeJson

path = os.path.dirname(os.path.dirname(__file__)) + '/components/Blocks'

blocksByName = {}
filesToAdd = []


# 1. change key: 'circuit' to 'circuits'
for (dirpath, dirnames, filenames) in os.walk(path):
    
    for filename in filenames:
        if filename.endswith('.json'): 
            
            print(filename)

            json_data=open(dirpath + '/' + filename).read()
            data = json.loads(json_data)
            
            
            if 'circuit' in data:
                data['circuits'] = data.pop('circuit')
            
            f = open(dirpath + '/' + filename, 'w')
            f.write(newOrginizeJson(data))
            f.close()
            

import pdb; pdb.set_trace() 
