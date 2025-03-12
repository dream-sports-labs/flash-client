import React, { memo } from 'react'
import {
  type ConfigurableProps,
  type PropData,
  SduiImage,
} from 'react-native-server-driven-ui'
import { SduiView, SduiText } from 'react-native-server-driven-ui'

interface CardDataProps extends PropData {
  cardTitle: string
  imageUrl: string
}

export const CardComponent: React.FC<ConfigurableProps<CardDataProps>> = memo(
  (props: ConfigurableProps<CardDataProps>) => {
    return (
      <SduiView
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
        nativeID="card-sdui-view"
        configProps={props}
      >
        <SduiImage
          nativeID="card-image"
          configProps={props}
          src={props.data?.imageUrl || 'default-image.jpg'}
          style={{ width: '100%', height: 150 }}
        />
        <SduiText
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
        </SduiText>
      </SduiView>
    )
  }
)
