import { ColorScaleType } from 'ThemeGenerator/types'

export const luminances = [
  99.99, // 000 white
  97.0, // 050
  92.0, // 100
  85.0, // 200
  74.0, // 300
  62.0, // 400
  48.9, // 500
  39.0, // 600
  27.0, // 700
  15.0, // 800
  5.0, // 900
]

export const scales: ColorScaleType[] = [
  {
    id: 'grey',
    hue: 230,
    shades: [
      { id: 'grey-000', chroma: 0 },
      { id: 'grey-050', chroma: 1 },
      { id: 'grey-100', chroma: 2.8203125 },
      { id: 'grey-200', chroma: 3.6828125 },
      { id: 'grey-300', chroma: 3.801562500000002 },
      { id: 'grey-400', chroma: 4.795703125000003 },
      { id: 'grey-500', chroma: 4.0687500000000005 },
      { id: 'grey-600', chroma: 4.4150390625 },
      { id: 'grey-700', chroma: 3.8486328125 },
      { id: 'grey-800', chroma: 3.982226562500001 },
      { id: 'grey-900', chroma: 3.1044921875 },
    ],
  },
  {
    id: 'primary',
    hue: 230,
    shades: [
      { id: 'primary-000', chroma: 0 },
      { id: 'primary-050', chroma: 5.859375 },
      { id: 'primary-100', chroma: 15.8203125 },
      { id: 'primary-200', chroma: 29.8828125 },
      { id: 'primary-300', chroma: 36.6015625 },
      { id: 'primary-400', chroma: 33.595703125 },
      { id: 'primary-500', chroma: 29.46875 },
      { id: 'primary-600', chroma: 24.4150390625 },
      { id: 'primary-700', chroma: 18.8486328125 },
      { id: 'primary-800', chroma: 13.2822265625 },
      { id: 'primary-900', chroma: 7.104492187 },
    ],
  },
]
