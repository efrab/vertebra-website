import type {APIRoute} from 'astro'

export const POST: APIRoute = async ({request}) => {
  const form = await request.formData()
  const payload = {
    firstName: String(form.get('firstName') || ''),
    lastName: String(form.get('lastName') || ''),
    email: String(form.get('email') || ''),
    phone: String(form.get('phone') || ''),
    properties: String(form.get('properties') || ''),
    message: String(form.get('message') || ''),
    variant: String(form.get('variant') || 'contact'),
    locale: String(form.get('locale') || 'es'),
  }

  if (!payload.email || !payload.firstName) {
    return new Response(JSON.stringify({ok: false, error: 'missing_fields'}), {
      status: 400,
      headers: {'Content-Type': 'application/json'},
    })
  }

  console.info('[lead]', payload)

  return new Response(JSON.stringify({ok: true}), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}
