import { readFileSync } from 'fs'
import { URL } from 'url'
import { gql } from 'graphql-tag'

const schemaPath = new URL('../schema.graphql', import.meta.url).pathname
export const typeDefs = gql(readFileSync(schemaPath , { encoding: 'utf-8' }))
