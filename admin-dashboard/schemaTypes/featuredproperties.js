import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured_properties',
  title: 'Featured properties',
  type: 'document',
  fields: [
    defineField({
      name: 'properties_name',
      title: 'Properties name',
      type: 'string',
    }),
    defineField({
      name: 'properties_address',
      title: 'Properties address',
      type: 'string',
    }),
    defineField({
      name: 'properties_tag',
      title: 'Properties tag',
      type: 'string',
    }),
    defineField({
      name: 'properties_price',
      title: 'Properties price',
      type: 'string',
    }),
    defineField({
      name: 'properties_area',
      title: 'Properties area',
      type: 'string',
    }),
    defineField({
      name: 'properties_rooms_count',
      title: 'Properties rooms count',
      type: 'string',
    }),
    defineField({
      name: 'properties_bathrooms_count',
      title: 'Properties bathrooms count',
      type: 'string',
    }),
    defineField({
      name: 'properties_garage_counts',
      title: 'Properties garage counts',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
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

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
  },
})
