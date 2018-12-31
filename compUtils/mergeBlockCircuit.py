import os
import json
from utilsFuncs import newOrginizeJson

path = os.path.dirname(os.path.dirname(__file__)) + '/components/Blocks'
dstpath2 = os.path.dirname(os.path.dirname(__file__)) + '/components/Blocks2'
dstpath3 = os.path.dirname(os.path.dirname(__file__)) + '/components/Blocks3'

blocksByName = {}
filesToAdd = []

# phase A - transform and save all circuits
# save all blocks by name
print('~~~~~~~~~~~circuits')
for (dirpath, dirnames, filenames) in os.walk(path):
    
    for filename in filenames:
        if filename.endswith('.json'): 
            
            # if 'LEDBlue' not in filename:
            #     continue
            json_data=open(dirpath + '/' + filename).read()
            data = json.loads(json_data)

            if not data['circuit'] or 'app' in data or not data['supportedControllers']:
                continue
            
            print(filename)
            sideDict = {}
            # move supportedControllers, coders, name into circuit
            for key in data:
                if key in ['path', 'circuit']:
                    continue
                sideDict[key] = data[key]
            
            sideDict.update(data['circuit'])
            
            # blocksByName['circuit'][data['name']] = sideDict
            
            if 'supportedControllers' in data:
                del data['supportedControllers']
            
            
            f = open(dstpath2 + '/' + filename, 'w')
            f.write(newOrginizeJson(sideDict))
            f.close()
            
            os.remove(dirpath + '/' + filename)
            
# import pdb; pdb.set_trace() 
                
# catch residue of circuits
print('~~~~~~~~~~~~~~other circuits')
for (dirpath, dirnames, filenames) in os.walk(path):
    
    for filename in filenames:
        if filename.endswith('.json'): 
            
            # if 'LEDBlue' not in filename:
            #     continue
            json_data=open(dirpath + '/' + filename).read()
            data = json.loads(json_data)

            if not data['circuit'] or 'app' in data:
                continue
            
            
            if 'coders' not in data:
                continue
            print(filename)    
            sideDict = {}
            # move supportedControllers, coders, name into circuit
            for key in data:
                if key in ['path', 'circuit']:
                    continue
                sideDict[key] = data[key]
            
            sideDict.update(data['circuit'])
            
            # blocksByName['circuit'][data['name']] = sideDict
            
            if 'supportedControllers' in data:
                del data['supportedControllers']
            
            f = open(dstpath2 + '/' + filename, 'w')
            f.write(newOrginizeJson(sideDict))
            f.close()
            
            os.remove(dirpath + '/' + filename)
            
            



# import pdb; pdb.set_trace() 


print('~~~~~~~~~~~~~~blocks with requires')
for (dirpath, dirnames, filenames) in os.walk(path):
    
    for filename in filenames:
        if filename.endswith('.json'): 
            
            # if 'LEDBlue' not in filename:
            #     continue
            json_data=open(dirpath + '/' + filename).read()
            data = json.loads(json_data)
            
            
            if data.get('requires') and not data.get('circuit'):
                data['circuit'] = []
                if 'path' in data:
                        del data['path']
                        
                print(filename)
                for reqPr, reqNames in data.get('requires'):
                    for reqName in reqNames:
                        if data['name'] in reqName:
                            blocksByName.setdefault(data['name'],{'data': data, 'reqs':[]})['reqs'].append((reqPr,reqName))
                            
                            json_data=open(dstpath2 + '/' + reqName + '.json').read()
                            reqData = json.loads(json_data)
                            
                            reqData['priority'] = reqPr
                            for key in ['category', 'blockId']:
                                if key in reqData:
                                    del reqData[key]
                            
                            
                            data['circuit'].append(reqData)
                            
                del data['requires']
                # check about supportet controllers - delete?
                
                if 'supportedControllers' in data:
                    del data['supportedControllers'] 
                
                f = open(dstpath3 + '/' + filename, 'w')
                f.write(newOrginizeJson(data))
                f.close()
                
                os.remove(dirpath + '/' + filename)

# import pdb; pdb.set_trace()

print('~~~~~~~~~~~~~~blocks without requires')
for (dirpath, dirnames, filenames) in os.walk(path):
    
    for filename in filenames:
        if filename.endswith('.json'): 
            
            # if 'LEDBlue' not in filename:
            #     continue
            json_data=open(dirpath + '/' + filename).read()
            data = json.loads(json_data)
            
            print(filename)
            
            sideDict = {}
            for key in ['name','coders', 'supportedControllers', 'requires']:
                if key in data:
                    sideDict[key] = data[key]
                
            for key in data['circuit']:
                sideDict[key] = data['circuit'][key]
            
            for key in ['coders', 'supportedControllers', 'circuit', 'path', 'requires']:
                if key in data:
                    del data[key]
                
            data['circuit'] = [sideDict]
            # import pdb; pdb.set_trace()    
            
            if 'supportedControllers' in data:
                del data['supportedControllers']
                
            f = open(dstpath3 + '/' + filename, 'w')
            f.write(newOrginizeJson(data))
            f.close()
            
            os.remove(dirpath + '/' + filename)
    
            
     
