import {Card, Flex, Grid, Text} from '@sanity/ui'
import {getIconPreviewUrl, type IconCatalogOption} from '../lib/iconCatalog'

type Props = {
  options: IconCatalogOption[]
  selectedValue?: string
  onSelect: (value: string) => void
}

export function IconPickerGrid({options, selectedValue, onSelect}: Props) {
  return (
    <Grid columns={[2, 3, 4]} gap={2}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value
        return (
          <Card
            key={option.value}
            as="button"
            type="button"
            padding={3}
            radius={2}
            shadow={isSelected ? 2 : 1}
            tone={isSelected ? 'primary' : 'default'}
            onClick={() => onSelect(option.value)}
            style={{
              cursor: 'pointer',
              border: isSelected ? '2px solid var(--card-focus-ring-color)' : '2px solid transparent',
            }}
          >
            <Flex direction="column" align="center" gap={2}>
              <img
                src={getIconPreviewUrl(option.previewPath)}
                alt=""
                width={54}
                height={54}
                style={{display: 'block', objectFit: 'contain'}}
              />
              <Text size={1} weight="medium" align="center">
                {option.title}
              </Text>
            </Flex>
          </Card>
        )
      })}
    </Grid>
  )
}
