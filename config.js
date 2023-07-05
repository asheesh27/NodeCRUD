const config = {
    development: {
      database: {
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        name: 'db',
        username: 'root',
        password: 'palnar123'
      },
      server: {
        host: 'localhost',
        port: 1337,
      },
    },
    production: {
      database: {
        type: 'mariadb',
        host: 'localhost',
        port: 3306,
        name: 'db',
        username: 'root',
        password: 'palnar123'
      },
      server: {
        host: 'production-host',
        port: 1337,
      },
    },
  };
  
  export default config;
  