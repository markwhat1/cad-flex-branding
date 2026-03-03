const fs=require("fs"),path=require("path"),{default:mi18n}=require("mi18n"),langFiles=fs.readdirSync(__dirname).reduce((e,r)=>{if(!/.lang$/.test(r))return e
const n=fs.readFileSync(path.resolve(__dirname,r)).toString(),i=path.basename(r)
return e[i.substr(0,i.indexOf("."))]=mi18n.processFile(n),e},{})
module.exports=langFiles
