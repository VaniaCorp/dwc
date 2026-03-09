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
      name: 'team_lead',
      title: 'Team Lead',
      type: 'reference',
      to: [{type: 'students'}],
    }),
    defineField({
      name: 'team_members',
      title: 'Team Members',
      type: 'array',
      of: [{type: 'reference', to: {type: 'students'}}],
    }),
    defineField({
      name: 'project_link',
      title: 'Project Link',
      type: 'url',
    }),
  ],
})

export default teams
