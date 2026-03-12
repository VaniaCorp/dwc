import {defineType, defineField} from 'sanity'

const students = defineType({
  name: 'students',
  title: 'Students',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
})

export default students
