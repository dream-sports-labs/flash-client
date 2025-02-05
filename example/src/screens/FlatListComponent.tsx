import { FlatListInflater, SDUI } from 'react-native-server-driven-ui'
import { flatListDefaultConfig } from './mock/FlatListDefaultConfig'
import { ComponentName } from '../constants/AppConstants'

const FlatListComponent = () => {
  const flatListComponent = SDUI.getComponentLayout(
    ComponentName.FLAT_LIST_COMPONENT,
    flatListDefaultConfig
  )
  return (
    <FlatListInflater
      components={flatListComponent.components}
      data={flatListComponent.data}
      overrides={flatListComponent.overrides}
      style={flatListComponent.styles}
    />
  )
}

export default FlatListComponent
