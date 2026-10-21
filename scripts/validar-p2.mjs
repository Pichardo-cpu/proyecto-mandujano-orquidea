// Requiere Node.js 18+. No usa dependencias de terceros. Elimina el registro al finalizar.
const base = process.env.API_URL || 'http://localhost:3000';
const usuario = 'equipo-practica-2';
const json = {'content-type': 'application/json', 'x-user-id': usuario};
const uid = `p2-${Date.now()}-${Math.random().toString(16).slice(2,9)}`;
const data = {external_id: uid, nombre:'Sucursal de prueba',categoria:'sucursal',estado:'Estado de México',municipio:'Nezahualcóyotl',latitud:19.4,longitud:-99,notas:'Prueba controlada'};
let id;
async function check(method, path, expected, body) {
  const response = await fetch(base + path,{method,headers:json,body:body ? JSON.stringify(body):undefined});
  const result = await response.json();
  if (response.status !== expected) throw new Error(`${method} ${path}: se esperaba ${expected}, respondió ${response.status}: ${JSON.stringify(result)}`);
  console.log(`OK ${expected} ${method} ${path}`);
  return result;
}
try {
  await check('GET','/',200);
  await check('GET','/api/ubicaciones-guardadas',200);
  await check('POST','/api/ubicaciones-guardadas',400,{nombre:'incompleto'});
  const created = await check('POST','/api/ubicaciones-guardadas',201,data);
  id = created.data?.id;
  if(!id)throw new Error('El POST no devolvió data.id');
  const retrieved = await check('GET',`/api/ubicaciones-guardadas/${encodeURIComponent(id)}`,200);
  if(retrieved.data?.external_id!==uid)throw new Error('ID devuelto no coincide');
  await check('GET','/api/ubicaciones-guardadas/no-existe-para-esta-prueba',404);
  console.log('TODAS LAS COMPROBACIONES DE API HAN PASADO');
} catch(error){ console.error('FALLO:',error.message);process.exitCode=1; }
finally{if(id){try{await check('DELETE',`/api/ubicaciones-guardadas/${encodeURIComponent(id)}`,200);}catch(e){console.error('No se pudo limpiar:',e.message);process.exitCode=1;}}}
