import {defineField, defineType} from 'sanity'

const commments = defineType({
  name: 'comments',
  title: 'Comments',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
})

export default commments
