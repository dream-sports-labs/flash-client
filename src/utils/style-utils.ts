import { type Overrides } from '../types/types'

export function getSDUIStyles(nativeID: string, overrideProps?: Overrides) {
  try {
    return overrideProps?.[nativeID]?.styles?.style ?? {}
  } catch (e) {
    return {}
  }
}

export function getSDUIProps(nativeID: string, overrideProps?: Overrides) {
  try {
    return overrideProps?.[nativeID]?.props ?? {}
  } catch (e) {
    return {}
  }
}
