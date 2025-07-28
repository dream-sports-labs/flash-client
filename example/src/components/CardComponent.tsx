import {
  FlashImage,
  FlashText,
  FlashView,
  type ConfigurableProps,
  type PropData,
} from '@d11/flash-client'
import React, { memo } from 'react'

interface CardDataProps extends PropData {
  cardTitle: string
  imageUrl: string
}

export const CardComponent: React.FC<ConfigurableProps<CardDataProps>> = memo(
  (props: ConfigurableProps<CardDataProps>) => {
    return (
      <FlashView
        style={[
          {
            borderRadius: 8,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: '#007BFF',
            padding: 10,
          },
          props.styles,
        ]}
        nativeID="card-flash-view"
        configProps={props}
      >
        <FlashImage
          nativeID="card-image"
          configProps={props}
          src={props.data?.imageUrl || 'default-image.jpg'}
          style={{ width: '100%', height: 150 }}
        />
        <FlashText
          nativeID="card-title"
          configProps={props}
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            marginTop: 10,
          }}
        >
          {props.data?.cardTitle || 'Card Title'}
        </FlashText>
      </FlashView>
    )
  }
)
