import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'propertycategories',
  title: 'Property categories',
  type: 'document',
  fields: [
    defineField({
      name: 'categoriesName',
      title: 'Categories name',
      type: 'string',
    }),
    defineField({
      name: 'categoriesText',
      title: 'Categories text',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
