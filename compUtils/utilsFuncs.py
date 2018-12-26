import json

def newOrginizeJson(data):
    initialIndent = 5
    
    xxx = json.dumps(data,indent=4)
                                        
    xxx.find('"circuit"')
    idx1 = xxx.find('ports',xxx.find('"circuit"'))+ len('"circuit"')
    idx2 = xxx.find('"Coders"')
    yyy = xxx[idx1:idx2]
    
    idx = 0
    idxEnd = idx
    tmp = ''
    while idx != -1:
        reqIdx = yyy.find('"requires":', idx + len(tmp))
        provIdx = yyy.find('"provides":', idx + len(tmp))
        
        if reqIdx != -1 and provIdx != -1:
            idx = min(reqIdx, provIdx)
        elif reqIdx == -1:
            idx = provIdx
        else:
            idx = reqIdx
        
        if idx == -1:
            break
        
        count = 0
        startFlag = 0
        for i in range(len(yyy[idx:])):
            if yyy[idx + i] == '[':
                startFlag = 1
                count += 1
                continue
            if yyy[idx + i] == ']':
                count -= 1
                continue
            
            if startFlag and count == 0:
                idxEnd = idx + i
                break
            
        
        
        tmp = yyy[idx:idxEnd]
        # print(tmp)
        
        tmp = tmp.replace(' ','')
        tmp = tmp.replace('\n','')
        
        yyy = yyy.replace(yyy[idx:idxEnd] , tmp)
        # import pdb; pdb.set_trace()
         
        
    return xxx[:idx1] + yyy + xxx[idx2:]



