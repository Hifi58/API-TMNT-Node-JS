const fs = require('fs');

function writeDataToFile(filename, content){
    fs.writeFileSync(filenmae, JSON.stringify(content), 'utf8', (err) =>{
        if(err){
            console.log(err);
        }
    })
}

module.exports ={
    writeDataToFile
}