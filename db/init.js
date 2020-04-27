import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from '../knexfile';

// Initialize knex.
const knex = Knex(knexConfig.development);
// Give the knex instance to objection.
Model.knex(knex);

