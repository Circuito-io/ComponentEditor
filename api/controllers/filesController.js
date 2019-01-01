'use strict';

const fs = require('fs');
const path = require('path');

var objFolder = function (objPrefix){
    return global.dataFolder + '/' + objPrefix + '/';
}

var objFile = function(objPrefix, objName){
    return objFolder(objPrefix) + objName + '.json';
}

exports.list_all_files_factory = function(objPrefix) {
    return function(req, res) {
        var err = false;
        if (err)
          res.send(err);
          
        var files = fs.readdirSync(objFolder(objPrefix)).map(fn => path.basename(fn, '.json'));
        res.json(files);
    };
};


exports.read_a_file_factory = function(objPrefix) {
    return function(req, res) {
        fs.readFile(objFile(objPrefix, req.params.name), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.send(err);
            }

            try {
                var json = JSON.parse(data);
            }
            catch (err) {
                console.log(err);
                
                if (err instanceof SyntaxError)
                {
                    res.send('Invalid JSON<br>' + data);
                }
                return;
            }
            
            res.json(json);
        });
    };
}


exports.update_a_file_factory = function(objPrefix) {
    return function(req, res) {
        console.log("update", req.body);
        try {
            var data = JSON.stringify(req.body, null, 2)
        }
        catch (err) {
            console.log(err);
                
            if (err instanceof SyntaxError)
            {
                res.send('Invalid JSON<br>' + data);
            }
            return;
        }
        fs.writeFileSync(objFile(objPrefix, req.params.name), data);
        res.send('OK');
    };
};

exports.create_a_file_factory= function(objPrefix) {
    return function(req, res) {
        var name = req.body['name'];
        
        if (!name)
        {
            console.log('CREATE request with missing object name');
            res.send('Missing name in object');
            return;
        }
        
        console.log('name', name);

        try {
            var data = JSON.stringify(req.body, null, 2)
        }
        catch (err) {
            console.log(err);
                
            if (err instanceof SyntaxError)
            {
                res.send('Invalid JSON<br>' + data);
            }
            return;
        }
        fs.writeFileSync(objFile(objPrefix, name), data);
    };
};


exports.delete_a_file_factory = function(objPrefix) {
    return function(req, res) {
        fs.unlinkSync(objFile(objPrefix, req.params.name));
    };
};
