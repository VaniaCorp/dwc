import {defineField, defineType} from 'sanity'

const halloffame = defineType({
  name: 'hall-of-fame',
  title: 'Hall of Fame',
  type: 'document',
  fields: [
    defineField({
      name: 'cohort',
      title: 'Cohort',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Display Color',
      type: 'color',
    }),
    defineField({
      name: 'student_name',
      title: 'Student Name',
      type: 'string',
    }),
    defineField({
      name: 'student_image',
      title: 'Student Image',
      type: 'image',
    }),
  ],
})

export default halloffame
