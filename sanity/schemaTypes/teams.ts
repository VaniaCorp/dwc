import {defineField, defineType} from 'sanity'

const teams = defineType({
  name: 'teams',
  title: 'Teams',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Team name',
      type: 'string',
    }),
    defineField({
      name: 'team_image',
      title: 'Team Image',
      type: 'image',
    }),
    defineField({
      name: 'project_link',
      title: 'Project Link',
      type: 'url',
    }),
  ],
})

export default teams
