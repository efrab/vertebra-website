import {Button, Stack} from '@sanity/ui'
import {useCallback} from 'react'
import {set, unset, type StringInputProps} from 'sanity'
import {getIconCatalog, type IconCatalogKey} from '../lib/iconCatalog'
import {IconPickerGrid} from './IconPickerGrid'

type IconFieldOptions = {
  iconCatalog?: IconCatalogKey
}

export function IconPickerInput(props: StringInputProps) {
  const {value, onChange, schemaType} = props
  const options = schemaType.options as IconFieldOptions | undefined
  const catalogKey = options?.iconCatalog ?? 'metrics'
  const catalog = getIconCatalog(catalogKey)
  const isRequired = Boolean(schemaType.validation?.length)

  const handleSelect = useCallback(
    (next: string) => {
      onChange(value === next && !isRequired ? unset() : set(next))
    },
    [isRequired, onChange, value],
  )

  const handleClear = useCallback(() => {
    onChange(unset())
  }, [onChange])

  return (
    <Stack space={3}>
      <IconPickerGrid
        options={catalog}
        selectedValue={typeof value === 'string' ? value : undefined}
        onSelect={handleSelect}
      />
      {!isRequired && value && (
        <Button text="Clear icon" mode="ghost" tone="critical" onClick={handleClear} />
      )}
    </Stack>
  )
}
