import { type Component } from 'react-native-server-driven-ui'

export const flatListDefaultConfig: Component = {
  id: 2,
  name: 'FlatListComponent',
  components: [
    {
      id: 0,
      name: 'SduiComponent',
      styles: {
        style: {},
      },
      data: {
        title: 'Generic My Matches',
      },

      components: [
        {
          id: 1,
          name: 'SduiView',
          styles: {
            style: {
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              padding: 10,
              margin: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          },
          data: {
            matchTitle: 'India vs Pakistan',
            matchDate: 'March 25, 2024',
            matchTime: '7:00 PM',
            venue: 'Eden Gardens, Kolkata',
          },

          components: [
            {
              id: 2,
              name: 'SduiView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                },
              },
              components: [
                {
                  id: 3,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#000',
                    },
                  },
                  data: {
                    text: 'India vs Pakistan',
                  },
                },
                {
                  id: 4,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 14,
                      color: '#888',
                    },
                  },
                  data: {
                    text: 'March 25, 2024',
                  },
                },
              ],
            },
            {
              id: 5,
              name: 'SduiView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              },
              components: [
                {
                  id: 6,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 14,
                      color: '#888',
                    },
                  },
                  data: {
                    text: '7:00 PM',
                  },
                },
                {
                  id: 7,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 14,
                      color: '#888',
                    },
                  },
                  data: {
                    text: 'Eden Gardens, Kolkata',
                  },
                },
              ],
            },
            {
              id: 8,
              name: 'SduiView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                },
              },
              components: [
                // {
                //   id: 9,
                //   name: 'SduiImage',
                //   styles: {
                //     style: {
                //       width: 60,
                //       height: 60,
                //       borderRadius: 50,
                //       marginRight: 10,
                //     },
                //   },
                //   data: {
                //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                //   },
                // },
                {
                  id: 10,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#000',
                    },
                  },
                  data: {
                    text: 'Watch Live!',
                  },
                },
              ],
            },
            {
              id: 11,
              name: 'SduiView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 10,
                },
              },
              components: [
                // {
                //   id: 12,
                //   name: 'SduiImage',
                //   styles: {
                //     style: {
                //       backgroundColor: '#007BFF',
                //       paddingVertical: 10,
                //       paddingHorizontal: 20,
                //       borderRadius: 5,
                //     },
                //   },
                //   data: {
                //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                //   },
                // },
                // {
                //   id: 13,
                //   name: 'SduiImage',
                //   styles: {
                //     style: {
                //       backgroundColor: '#6C757D',
                //       paddingVertical: 10,
                //       paddingHorizontal: 20,
                //       borderRadius: 5,
                //     },
                //   },
                //   data: {
                //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                //   },
                // },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 0,
      name: 'SduiComponent',
      styles: {
        style: {},
      },
      data: {
        title: 'Generic My Matches',
      },

      components: [
        {
          id: 1,
          name: 'SduiView',
          styles: {
            style: {
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              padding: 10,
              margin: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          },
          data: {
            matchTitle: 'India vs Pakistan',
            matchDate: 'March 25, 2024',
            matchTime: '7:00 PM',
            venue: 'Eden Gardens, Kolkata',
          },

          components: [
            {
              id: 2,
              name: 'SduiView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                },
              },
              components: [
                {
                  id: 3,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#000',
                    },
                  },
                  data: {
                    text: 'India vs Pakistan',
                  },
                },
                {
                  id: 4,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 14,
                      color: '#888',
                    },
                  },
                  data: {
                    text: 'March 25, 2024',
                  },
                },
              ],
            },
            {
              id: 5,
              name: 'SduiView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              },
              components: [
                {
                  id: 6,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 14,
                      color: '#888',
                    },
                  },
                  data: {
                    text: '7:00 PM',
                  },
                },
                {
                  id: 7,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 14,
                      color: '#888',
                    },
                  },
                  data: {
                    text: 'Eden Gardens, Kolkata',
                  },
                },
              ],
            },
            {
              id: 8,
              name: 'SduiView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                },
              },
              components: [
                // {
                //   id: 9,
                //   name: 'SduiImage',
                //   styles: {
                //     style: {
                //       width: 60,
                //       height: 60,
                //       borderRadius: 50,
                //       marginRight: 10,
                //     },
                //   },
                //   data: {
                //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                //   },
                // },
                {
                  id: 10,
                  name: 'SduiText',
                  styles: {
                    style: {
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#000',
                    },
                  },
                  data: {
                    text: 'Watch Live!',
                  },
                },
              ],
            },
            {
              id: 11,
              name: 'SduiView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 10,
                },
              },
              components: [
                // {
                //   id: 12,
                //   name: 'SduiImage',
                //   styles: {
                //     style: {
                //       backgroundColor: '#007BFF',
                //       paddingVertical: 10,
                //       paddingHorizontal: 20,
                //       borderRadius: 5,
                //     },
                //   },
                //   data: {
                //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                //   },
                // },
                // {
                //   id: 13,
                //   name: 'SduiImage',
                //   styles: {
                //     style: {
                //       backgroundColor: '#6C757D',
                //       paddingVertical: 10,
                //       paddingHorizontal: 20,
                //       borderRadius: 5,
                //     },
                //   },
                //   data: {
                //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                //   },
                // },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'SduiText',
      styles: {
        style: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#000',
          margin: 10,
        },
      },
      data: {
        text: 'Dummy Sdui Text Base Component from Default Config',
      },

      overrides: {
        'dummy-sdui-text': {
          styles: {
            style: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#000',
            },
          },
          props: {
            text: false,
          },
        },
      },
    },
  ],
  data: {
    title: 'Cricket',
    iconUrl: 'https://s3.amazonaws.com/pwaimages/imgs/site-cricket.svg',
  },
  styles: {
    style: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 6,
    },
  },
}
