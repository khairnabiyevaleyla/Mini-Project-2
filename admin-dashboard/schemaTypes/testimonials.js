import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer name',
      type: 'string',
    }),
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials title ',
      type: 'string',
    }),
    defineField({
      name: 'testimonialsText',
      title: 'Testimonials text',
      type: 'string',
    }),

    defineField({
      name: 'customerAddress',
      title: 'Customer address ',
      type: 'string',
    }),
    defineField({
      name: 'customerImage',
      title: 'Customer image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
