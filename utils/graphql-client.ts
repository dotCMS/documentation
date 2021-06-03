import { GraphQLClient } from 'graphql-request';

const BASE_URL = 'https://auth.dotcms.com/api/v1/graphql';
export const client = new GraphQLClient(BASE_URL);
