import {
  type ConfigurableProps,
  type SduiComponentConfigurableProps,
} from '../../types/types'
import { SduiView } from '../base-components/SduiView'
import { RenderItem } from '../../renderer/RenderItem'

const SduiComponent = (props: ConfigurableProps) => {
  try {
    return <RenderItem {...(props as SduiComponentConfigurableProps)} />
  } catch (e) {
    return (
      <SduiView
        key={'sdui-error-view'}
        nativeID="sdui-error-view"
        configProps={{}}
      />
    )
  }
}

export { SduiComponent }
