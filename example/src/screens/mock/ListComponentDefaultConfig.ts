import { type Component } from 'flash-client'

export const listComponentDefaultConfig: Component = {
  id: 2,
  name: 'ListComponent',
  components: [
    {
      id: 0,
      name: 'FlashComponent',
      styles: {
        style: {},
      },
      data: {
        title: 'Generic My Matches',
      },

      components: [
        {
          id: 1,
          name: 'FlashView',
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
              name: 'FlashView',
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
                  name: 'FlashText',
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
                  name: 'FlashText',
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
              name: 'FlashView',
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
                  name: 'FlashText',
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
                  name: 'FlashText',
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
              name: 'FlashView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                },
              },
              components: [
                {
                  id: 9,
                  name: 'FlashImage',
                  styles: {
                    style: {
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      marginRight: 10,
                    },
                  },
                  data: {
                    uri: 'https://www.thestatesman.com/wp-content/uploads/2019/03/India-Pakistan.jpg',
                  },
                },
                {
                  id: 10,
                  name: 'FlashText',
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
              name: 'FlashView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 10,
                },
              },
              components: [
                {
                  id: 12,
                  name: 'FlashImage',
                  styles: {
                    style: {
                      backgroundColor: '#007BFF',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    },
                  },
                  data: {
                    uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/510px-Flag_of_India.svg.png',
                  },
                },
                {
                  id: 13,
                  name: 'FlashImage',
                  styles: {
                    style: {
                      backgroundColor: '#6C757D',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    },
                  },
                  data: {
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/800px-Flag_of_Pakistan.svg.png',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 0,
      name: 'FlashComponent',
      styles: {
        style: {},
      },
      data: {
        title: 'Generic My Matches',
      },

      components: [
        {
          id: 1,
          name: 'FlashView',
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
              name: 'FlashView',
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
                  name: 'FlashText',
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
                  name: 'FlashText',
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
              name: 'FlashView',
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
                  name: 'FlashText',
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
                  name: 'FlashText',
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
              name: 'FlashView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                },
              },
              components: [
                {
                  id: 9,
                  name: 'FlashImage',
                  styles: {
                    style: {
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                      marginRight: 10,
                    },
                  },
                  data: {
                    uri: 'https://www.thestatesman.com/wp-content/uploads/2019/03/India-Pakistan.jpg',
                  },
                },
                {
                  id: 10,
                  name: 'FlashText',
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
              name: 'FlashView',
              styles: {
                style: {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 10,
                },
              },
              components: [
                {
                  id: 12,
                  name: 'FlashImage',
                  styles: {
                    style: {
                      backgroundColor: '#007BFF',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    },
                  },
                  data: {
                    uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/510px-Flag_of_India.svg.png',
                  },
                },
                {
                  id: 13,
                  name: 'FlashImage',
                  styles: {
                    style: {
                      backgroundColor: '#6C757D',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                    },
                  },
                  data: {
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/800px-Flag_of_Pakistan.svg.png',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'FlashText',
      styles: {
        style: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#000',
          margin: 10,
        },
      },
      data: {
        text: 'Dummy Flash Text Base Component from Default Config',
      },

      overrides: {
        'dummy-flash-text': {
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
