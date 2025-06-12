import { memo } from 'react'
import { type FlashComponentConfigurableProps } from 'flash-client'
import { getComponent } from '../utils/render-utils'

export const RenderItem = memo((props: FlashComponentConfigurableProps) => {
  if (!props.components || props.components.length === 0) {
    return null
  }

  return (
    <>
      {props.components.map((item, index) => {
        const RenderComponent = getComponent(item.name)
        return (
          <RenderComponent
            key={`${item.name}-${index}`}
            components={item.components}
            styles={item.styles}
            overrides={item.overrides || {}}
            // @ts-ignore
            data={item.data}
          >
            {item.components && item.components.length > 0 && (
              <RenderItem
                components={
                  item.components as FlashComponentConfigurableProps['components']
                }
              />
            )}
          </RenderComponent>
        )
      })}
    </>
  )
})
