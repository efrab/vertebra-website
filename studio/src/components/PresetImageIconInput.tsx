import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {useCallback, useEffect, useState} from 'react'
import {set, unset, useClient, type ObjectInputProps} from 'sanity'
import {
  getIconCatalog,
  getIconPreviewUrl,
  type IconCatalogKey,
} from '../lib/iconCatalog'
import {IconPickerGrid} from './IconPickerGrid'

type ImageIconFieldOptions = {
  iconCatalog?: Extract<IconCatalogKey, 'contentCard' | 'contact'>
}

type ImageValue = {
  _type?: 'image'
  asset?: {_type?: 'reference'; _ref?: string}
}

export function PresetImageIconInput(props: ObjectInputProps) {
  const {value, onChange, schemaType, renderDefault} = props
  const client = useClient({apiVersion: '2024-01-01'})
  const options = schemaType.options as ImageIconFieldOptions | undefined
  const catalogKey = options?.iconCatalog ?? 'contentCard'
  const catalog = getIconCatalog(catalogKey).map((option) => ({
    ...option,
    value: option.previewPath,
  }))

  const imageValue = value as ImageValue | undefined
  const [selectedPath, setSelectedPath] = useState<string | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [showCustom, setShowCustom] = useState(false)
  const [loadingPath, setLoadingPath] = useState<string | null>(null)

  useEffect(() => {
    const assetRef = imageValue?.asset?._ref
    if (!assetRef) {
      setSelectedPath(undefined)
      return
    }

    let cancelled = false
    client
      .fetch<string | null>(`*[_id == $id][0].source.name`, {id: assetRef})
      .then((sourceName) => {
        if (!cancelled) setSelectedPath(sourceName ?? undefined)
      })
      .catch(() => {
        if (!cancelled) setSelectedPath(undefined)
      })

    return () => {
      cancelled = true
    }
  }, [client, imageValue?.asset?._ref])

  const handleSelect = useCallback(
    async (previewPath: string) => {
      setLoadingPath(previewPath)
      setError(null)

      try {
        const assetId = await client.fetch<string | null>(
          `*[_type == "sanity.imageAsset" && source.name == $path][0]._id`,
          {path: previewPath},
        )

        if (!assetId) {
          setError('Asset no encontrado; ejecuta npm run patch:images -- --apply')
          return
        }

        onChange(
          set({
            _type: 'image',
            asset: {_type: 'reference', _ref: assetId},
          }),
        )
        setSelectedPath(previewPath)
        setShowCustom(false)
      } finally {
        setLoadingPath(null)
      }
    },
    [client, onChange],
  )

  const handleClear = useCallback(() => {
    onChange(unset())
    setSelectedPath(undefined)
    setError(null)
  }, [onChange])

  return (
    <Stack space={4}>
      {imageValue?.asset?._ref && selectedPath && (
        <Card padding={3} radius={2} shadow={1}>
          <Flex align="center" gap={3}>
            <img
              src={getIconPreviewUrl(selectedPath)}
              alt=""
              width={54}
              height={54}
              style={{display: 'block', objectFit: 'contain'}}
            />
            <Text size={1} muted>
              Selected preset icon
            </Text>
          </Flex>
        </Card>
      )}

      <IconPickerGrid
        options={catalog}
        selectedValue={selectedPath}
        onSelect={(path) => {
          if (loadingPath) return
          void handleSelect(path)
        }}
      />

      {loadingPath && (
        <Text size={1} muted>
          Loading icon…
        </Text>
      )}

      {error && (
        <Card padding={3} radius={2} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}

      <Box>
        <Button
          text={showCustom ? 'Hide custom upload' : 'Upload custom icon'}
          mode="ghost"
          onClick={() => setShowCustom((open) => !open)}
        />
      </Box>

      {showCustom && renderDefault(props)}

      {imageValue?.asset?._ref && (
        <Button text="Clear icon" mode="ghost" tone="critical" onClick={handleClear} />
      )}
    </Stack>
  )
}
