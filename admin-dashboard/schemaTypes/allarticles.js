import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'allarticles',
  title: 'All articles',
  type: 'document',
  fields: [
    defineField({
      name: 'articlesName',
      title: 'Articles name',
      type: 'string',
    }),
    defineField({
      name: 'articlesDate',
      title: 'Articles date',
      type: 'date',
    }),
    defineField({
      name: 'articlesDuration',
      title: 'Articles duration',
      type: 'string',
    }),

    defineField({
      name: 'articlesImage',
      title: 'Articles image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
