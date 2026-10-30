import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('public');
export const server=http.createServer(async(req,res)=>{
 try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}const data=await readFile(file);res.writeHead(200,{'Content-Type':({'html':'text/html; charset=utf-8','js':'text/javascript','css':'text/css'})[file.split('.').pop()]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'}).end(data);}catch{res.writeHead(404).end('Not found');}
});
server.listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Terminal listening on port '+(process.env.PORT||3000)));
