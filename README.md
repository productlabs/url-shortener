# URL Shortener


## API

```yaml
openapi: 3.0.0
info:
  title: URL Shortener
  version: 1.0.0
  license:
    name: MIT
    url: 'https://opensource.org/licenses/MIT'
paths:
  /v1/link:
    post:
      tags:
        - link
      summary: Create link
      operationId: create-link
      responses:
        '200':
          $ref: '#/components/responses/LinkSuccess'
        '400':
          description: Bad Request
        '401':
          $ref: '#/components/responses/UnauthorizedError'
      requestBody:
        $ref: '#/components/requestBodies/Link'
      security:
        - Authorization: []
  '/v1/link/{slug}':
    get:
      tags:
        - link
      summary: Lookup link
      operationId: get-link
      parameters:
        - $ref: '#/components/parameters/slug'
      responses:
        '200':
          $ref: '#/components/responses/LinkSuccess'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '404':
          description: Not Found
      security:
        - Authorization: []
    put:
      tags:
        - link
      summary: Update an existing link
      operationId: update-link
      parameters:
        - $ref: '#/components/parameters/slug'
      responses:
        '200':
          $ref: '#/components/responses/LinkSuccess'
        '400':
          description: Bad Request
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '404':
          description: Not Found
      requestBody:
        $ref: '#/components/requestBodies/Link'
      security:
        - Authorization: []
    delete:
      tags:
        - link
      summary: Delete link
      operationId: delete-link
      parameters:
        - $ref: '#/components/parameters/slug'
      responses:
        '204':
          description: Success
        '400':
          description: Bad Request
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '404':
          description: Not Found
      security:
        - Authorization: []
components:
  schemas:
    Link:
      type: object
      properties:
        code:
          type: integer
          default: 301
          enum:
            - 301
            - 302
            - 307
        long_url:
          type: string
          format: uri
        slug:
          type: string
          minLength: 3
          maxLength: 15
  links:
    GetLink:
      description: |
        The `slug` value returned in the response can be used as the `slug`
        parameter in `GET /v1/link/{slug}`.
      operationId: get-link
      parameters:
        slug: '$response.body#/slug'
  securitySchemes:
    Authorization:
      type: apiKey
      name: Authorization
      in: header
  requestBodies:
    Link:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Link'
      description: Link object
      required: true
  responses:
    LinkSuccess:
      description: Success
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Link'
      links:
        GetLink:
          $ref: '#/components/links/GetLink'
    UnauthorizedError:
      description: Access Token is missing or invalid
      headers:
        WWW-Authenticate:
          schema:
            type: string
  parameters:
    slug:
      in: path
      name: slug
      required: true
      schema:
        type: string
        maxLength: 15
        minLength: 3
tags:
  - name: link
    description: Links
servers: []
```
