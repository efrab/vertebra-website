import {defineArrayMember, defineField, defineType} from 'sanity'
import {localizedPreviewValue} from '../../lib/localized'

export default defineType({
  name: 'solutionsByRole',
  title: 'Solutions by role',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'internationalizedArrayString'}),
    defineField({name: 'heading', type: 'internationalizedArrayText'}),
    defineField({
      name: 'roles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'internationalizedArrayString'}),
            defineField({name: 'description', type: 'internationalizedArrayText'}),
            defineField({name: 'image', type: 'image', title: 'Role image (optional CMS upload)'}),
            defineField({name: 'bgSrc', type: 'string', title: 'Background image path'}),
            defineField({name: 'figureSrc', type: 'string', title: 'Figure image path'}),
            defineField({name: 'imageSrc', type: 'string', title: 'Image path (alias)'}),
            defineField({name: 'decorLeftSrc', type: 'string', title: 'Left decor path'}),
            defineField({name: 'decorRightSrc', type: 'string', title: 'Right decor path'}),
            defineField({name: 'decorLeftClass', type: 'string', title: 'Left decor CSS class'}),
            defineField({name: 'decorRightClass', type: 'string', title: 'Right decor CSS class'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: localizedPreviewValue(title, 'Solutions by role')}),
  },
})
