import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'agentspage',
  title: 'Agents page',
  type: 'document',
  fields: [
    defineField({
      name: 'agentName',
      title: 'Agent Name',
      type: 'string',
    }),
    defineField({
      name: 'agentPosition',
      title: 'Agent position',
      type: 'string',
    }),
    defineField({
      name: 'agentImage',
      title: 'Agent image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
