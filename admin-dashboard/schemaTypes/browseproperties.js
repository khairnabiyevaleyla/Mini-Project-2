import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'browseproperties',
  title: 'Browse properties',
  type: 'document',
  fields: [
    defineField({
      name: 'propertiesName',
      title: 'Properties name',
      type: 'string',
    }),
    defineField({
      name: 'propertiesAddress',
      title: 'Properties address',
      type: 'string',
    }),
    defineField({
      name: 'propertiesTag',
      title: 'Properties tag',
      type: 'string',
    }),
    defineField({
      name: 'propertiesPrice',
      title: 'Properties price',
      type: 'string',
    }),
    defineField({
      name: 'propertiesArea',
      title: 'Properties area',
      type: 'string',
    }),
    defineField({
      name: 'propertiesRoomsCount',
      title: 'Properties rooms count',
      type: 'string',
    }),
    defineField({
      name: 'propertiesBathroomsCount',
      title: 'Properties bathrooms count',
      type: 'string',
    }),
    defineField({
      name: 'propertiesGarageCounts',
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
})
