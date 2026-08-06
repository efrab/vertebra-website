import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'pageBuilder',
  title: 'Page builder',
  type: 'array',
  of: [
    defineArrayMember({type: 'heroHome'}),
    defineArrayMember({type: 'hero'}),
    defineArrayMember({type: 'benefitsGrid'}),
    defineArrayMember({type: 'roiStats'}),
    defineArrayMember({type: 'solutionsByRole'}),
    defineArrayMember({type: 'howItWorks'}),
    defineArrayMember({type: 'testimonials'}),
    defineArrayMember({type: 'trustLogos'}),
    defineArrayMember({type: 'securityFeatures'}),
    defineArrayMember({type: 'teamSection'}),
    defineArrayMember({type: 'headerInternal'}),
    defineArrayMember({type: 'moduleShowcase'}),
    defineArrayMember({type: 'formSection'}),
    defineArrayMember({type: 'ctaBanner'}),
    defineArrayMember({type: 'faqSection'}),
  ],
})
