let host     = 'b14fcbssous4ysz-mongodb.services.clever-cloud.com'
let db       = 'b14fcbssous4ysz'
let user     = 'u7vziyaehroqbywqttly'
let port     = 27017
let password = 'fnzbndyCNfLTxg7cVtls'

const database = `mongodb://${user}:${password}@${host}:${port}/${db}`;
// de esta forma creamos nuestra propia cadena de conexcion.

export {database};
