import { type Overrides } from '../types/types'

export function getFlashStyles(nativeID: string, overrideProps?: Overrides) {
  try {
    return overrideProps?.[nativeID]?.styles?.style ?? {}
  } catch (e) {
    return {}
  }
}

export function getFlashProps(nativeID: string, overrideProps?: Overrides) {
  try {
    return overrideProps?.[nativeID]?.props ?? {}
  } catch (e) {
    return {}
  }
}
