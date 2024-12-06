import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'agents',
  title: 'Agents',
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
