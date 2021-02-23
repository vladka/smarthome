export type Lazy<T> = {
  (): T
  then<T1>(modifier: (a: T) => Lazy<T1>): Lazy<T1>
  map<T1>(mapper: (a: T) => T1): Lazy<T1>
  isLazy: boolean
}
/** see https://www.codementor.io/@agustinchiappeberrini/lazy-evaluation-and-javascript-a5m7g8gs3 */
export const lazy = <T>(getter: () => T): Lazy<T> => {
  let evaluated = false
  let _res: T
  const res = () => {
    if (evaluated) return _res
    console.log('inicializace')
    _res = getter()
    evaluated = true
    return _res
  }
  res.isLazy = true
  res.then = <T1>(modifier: (a: T) => Lazy<T1>): Lazy<T1> => modifier(res())
  res.map = <T1>(mapper: (a: T) => T1): Lazy<T1> => lazy(() => mapper(res()))
  return res
}
