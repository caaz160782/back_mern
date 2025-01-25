// init-mongo.js
db = db.getSiblingDB('UPTASK'); // Cambia a la base de datos UPTASK
db.createCollection('exampleCollection'); // Crea una colección de ejemplo

// Crea un usuario con permisos de lectura y escritura
db.createUser({
  user: 'uptask_admin',
  pwd: '9UptasKadmiN0', // Cambia esto a una contraseña segura
  roles: [
    { role: 'readWrite', db: 'UPTASK' }
  ]
});