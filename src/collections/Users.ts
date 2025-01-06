import { code } from 'node_modules/payload/dist/fields/validations'
import type { CollectionConfig, PayloadRequest } from 'payload'

const SECRET_KEY = 'secret-key'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'text',
      required: true,
    },
  ],
  endpoints: [
    {
      path: '/auth/custom-register',
      method: 'post',
      handler: async (req) => {
        const data = req.json ? await req.json() : null
        if (!data) {
          return Response.json({ error: 'Invalid request' })
        }
        console.log(data)

        try {
          const findedUser = await req.payload.find({
            collection: 'users',
            where: {
              email: {
                equals: data.email,
              },
            },
          })

          console.log(findedUser)
          if (findedUser && findedUser.docs.length > 0) {
            return Response.json({ statusCode: 400, message: 'User already exists' })
          }

          const newUser = await req.payload.create({
            collection: 'users',
            data,
          })

          return Response.json({
            statusCode: 200,
            message: 'Registration successful',
            data: newUser,
          })
        } catch (error: any) {
          console.error(error)
          return Response.json({ error: error.message })
        }
      },
    },
  ],
}
