// import React from 'react'
//
// import { render } from '@testing-utils'
//
// import { SduiImage } from '../SduiImage'
// import { getSDUIProps, getSDUIStyles } from '../../../utils/style-utils'
// import { Image } from 'react-native'
//
// jest.mock('react-native/Libraries/Image/Image', () => jest.fn(() => null))
// jest.mock('../../../utils/style-utils', () => ({
//   getSDUIProps: jest.fn(),
//   getSDUIStyles: jest.fn(),
// }))
//
// describe('SduiImage', () => {
//   const mockNativeID = 'test-native-id'
//
//   const mockConfigProps = {
//     styles: { style: { width: 100, height: 100 } },
//     overrides: {},
//     data: { source: { uri: 'test-source' } }, // Correct format for React Native Image
//   }
//
//   const defaultProps = {
//     nativeID: mockNativeID,
//     configProps: mockConfigProps,
//     style: { borderRadius: 10 },
//   }
//   const getSduiPropsMock = getSDUIProps as jest.Mock
//   const getSDUIStylesMock = getSDUIStyles as jest.Mock
//
//   beforeEach(() => {
//     getSduiPropsMock.mockReturnValue({ resizeMode: 'contain' })
//     getSDUIStylesMock.mockReturnValue({ margin: 5 })
//   })
//
//   it('should render Image with correct props and styles', () => {
//     render(<SduiImage {...defaultProps} />)
//
//     expect(getSDUIProps).toHaveBeenCalledWith(
//       mockNativeID,
//       mockConfigProps.overrides
//     )
//     expect(getSDUIStyles).toHaveBeenCalledWith(
//       mockNativeID,
//       mockConfigProps.overrides
//     )
//
//     // Verify Image component is rendered with combined styles and correct props
//     expect(Image).toHaveBeenCalledWith(
//       expect.objectContaining({
//         style: [
//           defaultProps.style, // style from props
//           mockConfigProps.styles.style, // style from configProps
//           { margin: 5 }, // style from getSDUIStyles
//         ],
//         resizeMode: 'contain', // from getSDUIProps
//         source: { uri: 'test-source' }, // from configProps data
//       }),
//       {}
//     )
//   })
//
//   it('should merge styles correctly', () => {
//     render(<SduiImage {...defaultProps} />)
//
//     // Assert that Image is passed the correct merged styles
//     const expectedStyles = [
//       defaultProps.style, // props styles
//       mockConfigProps.styles.style, // configProps styles
//       { margin: 5 }, // styles from getSDUIStyles
//     ]
//
//     expect(Image).toHaveBeenCalledWith(
//       expect.objectContaining({
//         style: expectedStyles,
//       }),
//       {}
//     )
//   })
//
//   it('should pass dynamic data as props to Image', () => {
//     render(<SduiImage {...defaultProps} />)
//
//     // Verify that dynamic data from configProps is passed to Image
//     expect(Image).toHaveBeenCalledWith(
//       expect.objectContaining({
//         source: { uri: 'test-source' },
//       }),
//       {}
//     )
//   })
// })
