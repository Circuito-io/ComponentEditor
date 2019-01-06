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
            

# # 2. change circuit names
# for (dirpath, dirnames, filenames) in os.walk(path):
    
#     for filename in filenames:
#         if filename.endswith('.json'): 
            
#             print(filename)

#             json_data=open(dirpath + '/' + filename).read()
#             data = json.loads(json_data)
            
            
#             if data.get('circuits'):
#                 for circuit in data.get('circuits'):
#                     if data.get('name') in circuit.get('name'):
#                         circuit['name'] = circuit['name'].split(data['name'])[-1]
#                         for char in ['_','-']:
#                             circuit['name'].replace(char,'')
#                         print(circuit['name'])
#                         # import pdb; pdb.set_trace() 
            
#                 f = open(dirpath + '/' + filename, 'w')
#                 f.write(newOrginizeJson(data))
#                 f.close()
            

# 3. req and prov expantion to object
for (dirpath, dirnames, filenames) in os.walk(path):
    
    for filename in filenames:
        if filename.endswith('.json'): 
            
            print(filename)

            json_data=open(dirpath + '/' + filename).read()
            data = json.loads(json_data)
            
            
            if data.get('circuits'):
                for circuit in data.get('circuits'):
                    if 'ports' in circuit:
                        for port in circuit['ports']:
                            if 'requires' in port['interface']:
                                newRequires = []
                                for pr,req in port['interface']['requires']:
                                    
                                    newReq = {'cost': pr, 'spec': '', 'voltage' :''}
                                    
                                    if len(req) > 2:
                                        if len(set(req).intersection(['DigitalIn', 'Int'])) == 2:
                                            req.remove('Int')
                                            req.remove('DigitalIn')
                                            req.append('DigitalIn-Int')
                                        else:
                                            print('3 element req : {}'.format(req))
                                            import pdb; pdb.set_trace() 
                                    
                                    for re in req:
                                        if re in ["12v","9v","7.2v","7.4v","6v","5v","3.7v","3.3v","GND"]:
                                            newReq['voltage'] = re
                                        else:
                                            newReq['spec'] = re
                                    
                                    newRequires.append(newReq)
                                port['interface']['requires'] = newRequires
                            
                            if 'provides' in port['interface']:
                                
                                newProvides = []
                                for prov in port['interface']['provides']:
                                    
                                    newProv = { 'spec': '', 'voltage' :''}
                                    
                                    if len(prov) > 2:
                                        if len(set(prov).intersection(['DigitalIn', 'Int'])) == 2:
                                            prov.remove('Int')
                                            prov.remove('DigitalIn')
                                            prov.append('DigitalIn-Int')
                                        else:
                                            print('3 element req : {}'.format(req))
                                            import pdb; pdb.set_trace() 
                                    
                                    for pr in prov:
                                        if pr in ["12v","9v","7.2v","7.4v","6v","5v","3.7v","3.3v","GND"]:
                                            newProv['voltage'] = pr
                                        else:
                                            newProv['spec'] = pr
                                    
                                    newProvides.append(newProv)
                                    
                                port['interface']['provides'] = newProvides
                                
                                
                                import pdb; pdb.set_trace() 
                                
                                
                # f = open(dirpath + '/' + filename, 'w')
                # f.write(newOrginizeJson(data))
                # f.close()
            
            

    import pdb; pdb.set_trace() 
