import { type SchemaTypeDefinition } from 'sanity'
import { product , sizes , categories } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product , sizes , categories],
}
