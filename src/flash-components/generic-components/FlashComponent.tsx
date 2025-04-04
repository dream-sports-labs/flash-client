import {
  type ConfigurableProps,
  type FlashComponentConfigurableProps,
} from '../../types/types'
import { FlashView } from '../base-components/FlashView'
import { RenderItem } from '../../renderer/RenderItem'

const FlashComponent = (props: ConfigurableProps) => {
  try {
    return <RenderItem {...(props as FlashComponentConfigurableProps)} />
  } catch (e) {
    return (
      <FlashView
        key={'flash-error-view'}
        nativeID="flash-error-view"
        configProps={{}}
      />
    )
  }
}

export { FlashComponent }
