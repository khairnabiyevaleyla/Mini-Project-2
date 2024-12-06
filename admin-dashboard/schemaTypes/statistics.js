import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'statistics',
  title: 'Statistics',
  type: 'document',
  fields: [
    defineField({
      name: 'statisticsTitle',
      title: 'statisticsTitle',
      type: 'string',
    }),
    defineField({
      name: 'statisticsNumber',
      title: 'Statistics number',
      type: 'string',
    }),
    defineField({
      name: 'statisticsText',
      title: 'Statistics text',
      type: 'string',
    }),
  ],
})
