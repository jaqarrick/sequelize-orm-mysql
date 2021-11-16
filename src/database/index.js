import cls from 'cls-hooked';
import { Sequelize } from 'sequelize';
import { registerModels } from '../models';

export default class Database {
  constructor(environment, dbConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig;
    this.isTestEnvironment = this.environment === 'test';
  }

  async connect() {
    // Set up the namespace for transactions
    // We want all transactions to be managed / rolled back automatically
    // i.e. if a single transaction fails, others will roll back as well
    const namespace = cls.createNamespace('transactions');
    Sequelize.useCLS(namespace);

    // Create the connection
    const { username, password, host, port, database, dialect } =
      this.dbConfig[this.environment];
    this.connection = new Sequelize({
      username,
      password,
      host,
      port,
      database,
      dialect,
      logging: this.isTestEnvironment ? false : console.log,
    });

    // check if conn successs
    await this.connection.authenticate({ logging: false });

    if (!this.isTestEnvironment) {
      console.log('Connection to the db has been established');
    }

    // Register the models
    // Call registerModels with the connection as arg
    /*
        This does two things:
        1. Puts all models inside an object (the models object)
        keys are the names of the models, and values are the classes of the models
        2. Calls the associate methods - in order to form relational models
    */
    // Sync the models
    registerModels(this.connection);

    await this.sync();
  }

  async disconnect() {
    await this.connection.close();
  }

  async sync() {
    await this.connection.sync({
      logging: false,
      force: this.isTestEnvironment,
    });

    if (!this.isTestEnvironment) {
      console.log('Connection synced success!');
    }
  }
}
