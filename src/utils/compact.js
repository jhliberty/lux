/* @flow */

import { isNil } from '@lux/utils/is-type'

type Compact = <T: any>(
  source: Array<T>,
) => Array<T> | (<T: any>(source: T) => T)
const negate = fn => input => !fn(input)
const notNil = negate(isNil)

const compactArray = <T>(source: Array<T>): Array<T> => source.filter(notNil)

const compactObject = <T: Object>(source: T): T =>
  // $FlowFixMe
  Object.entries(source)
    .filter(([, value]) => notNil(value))
    .reduce((prev, [key, value]) => {
      const next = prev
      next[key] = value
      return next
    }, {})

const compact: Compact = source =>
  Array.isArray(source) ? compactArray(source) : compactObject(source)

export default compact
