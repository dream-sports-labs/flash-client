import { FlatListInflater, Flash } from 'flash-client'
import { listComponentDefaultConfig } from './mock/ListComponentDefaultConfig'
import { ComponentName } from '../constants/AppConstants'

const ListComponent = () => {
  const listComponent = Flash.getComponentLayout(
    ComponentName.LIST_COMPONENT,
    listComponentDefaultConfig
  )
  return (
    <FlatListInflater
      components={listComponent.components}
      data={listComponent.data}
      overrides={listComponent.overrides}
      style={listComponent.styles}
    />
  )
}

export default ListComponent
