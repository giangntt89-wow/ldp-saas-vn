const fs=require('fs');
const path=require('path');
const outDir=path.join(process.cwd(),'out');
let html=fs.readFileSync('hqsoft-saas-landing-standalone.html','utf8');
html=html.replace(/src=\"\.\/([^\"]+)\"/g, (m,p) => {
    try {
        const full=path.join(outDir, p);
        const ext=path.extname(full).toLowerCase();
        let type='image/png';
        if(ext==='.svg') type='image/svg+xml';
        if(ext==='.jpg' || ext==='.jpeg') type='image/jpeg';
        const b64=fs.readFileSync(full).toString('base64');
        return 'src=\"data:'+type+';base64,'+b64+'\"';
    } catch(e) { return m; }
});
html=html.replace(/url\(\"\.\/([^\"]+)\"\)/g, (m,p) => {
    try {
        const full=path.join(outDir, p);
        const ext=path.extname(full).toLowerCase();
        let type='image/png';
        if(ext==='.svg') type='image/svg+xml';
        if(ext==='.jpg' || ext==='.jpeg') type='image/jpeg';
        const b64=fs.readFileSync(full).toString('base64');
        return 'url(\"data:'+type+';base64,'+b64+'\")';
    } catch(e) { return m; }
});
fs.writeFileSync('hqsoft-saas-landing-standalone.html',html);
console.log('Images inlined successfully');
