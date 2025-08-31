## Postman testing guide

- Base URL: `http://localhost:5000/api`
- For protected routes, set header: `Authorization: Bearer YOUR_JWT`

### Admins

Create admin
```http
POST /admin
Content-Type: application/json

{
  "name": "Admin One",
  "email": "admin@example.com",
  "password": "admin123"
}
```

Admin login (get token)
```http
POST /admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Clients

Create client
```http
POST /client
Content-Type: application/json

{
  "name": "Client One",
  "email": "client@example.com",
  "password": "client123"
}
```

Client login
```http
POST /client/login
Content-Type: application/json

{
  "email": "client@example.com",
  "password": "client123"
}
```

List clients
```http
GET /client
```

Get client by id
```http
GET /client/{id}
```

Update client
```http
PUT /client/{id}
Authorization: Bearer YOUR_JWT
Content-Type: application/json

{ "name": "Client One Updated" }
```

Delete client
```http
DELETE /client/{id}
Authorization: Bearer YOUR_JWT
```

### Laptops

List laptops
```http
GET /laptop
```

Create laptop
```http
POST /laptop
Authorization: Bearer YOUR_JWT
Content-Type: application/json

{
  "name": "Acer Swift 3",
  "brand": "Acer",
  "price": 899,
  "image": "https://example.com/acer.jpg",
  "description": "Lightweight",
  "specs": { "cpu": "i5", "ram": "16GB", "ssd": "512GB" },
  "stock": 5
}
```

Update laptop
```http
PUT /laptop/{id}
Authorization: Bearer YOUR_JWT
Content-Type: application/json

{ "price": 849, "stock": 10 }
```

Delete laptop
```http
DELETE /laptop/{id}
Authorization: Bearer YOUR_JWT
```

### Orders

List orders
```http
GET /order
```

Create order
```http
POST /order
Content-Type: application/json

{
  "client": "CLIENT_ID",
  "items": [
    { "laptop": "LAPTOP_ID", "quantity": 2 },
    { "laptop": "LAPTOP_ID_2", "quantity": 1 }
  ]
}
```

Get order
```http
GET /order/{id}
```

Update order
```http
PUT /order/{id}
Authorization: Bearer YOUR_JWT
Content-Type: application/json

{ "status": "shipped" }
```

Delete order
```http
DELETE /order/{id}
Authorization: Bearer YOUR_JWT
```

### Purchases (order items)

List purchase items
```http
GET /purchase
```

Get purchase item
```http
GET /purchase/{itemId}
```

Update purchase item
```http
PUT /purchase/{itemId}
Content-Type: application/json

{ "quantity": 3 }
```

Delete purchase item
```http
DELETE /purchase/{itemId}
```

### Suggestions (submit)

Create suggestion
```http
POST /submit
Content-Type: application/json

{ "email": "user@example.com", "text": "Please add 32GB RAM model." }
```

List suggestions
```http
GET /submit
```

Get suggestion
```http
GET /submit/{id}
```

Update suggestion
```http
PUT /submit/{id}
Content-Type: application/json

{ "text": "Updated suggestion" }
```

Delete suggestion
```http
DELETE /submit/{id}
```

### Settings (manage)

List settings
```http
GET /manage
```

Create setting
```http
POST /manage
Content-Type: application/json

{ "key": "currency", "value": "USD" }
```

Update setting
```http
PUT /manage/{id}
Content-Type: application/json

{ "value": "EUR" }
```

Delete setting
```http
DELETE /manage/{id}
```

### Cancellations (note: path is /cancle)

List cancellations
```http
GET /cancle
```

Request cancel
```http
POST /cancle
Content-Type: application/json

{ "order_id": "ORDER_ID", "reason": "Changed mind" }
```

Update cancel
```http
PUT /cancle/{id}
Content-Type: application/json

{ "status": "approved" }
```

Delete cancel
```http
DELETE /cancle/{id}
```

### Dates demo

List dates
```http
GET /date
```

Create date
```http
POST /date
Content-Type: application/json

{ "iso": "2025-01-01T00:00:00.000Z", "note": "holiday" }
```

Update date
```http
PUT /date/{id}
Content-Type: application/json

{ "note": "updated" }
```

Delete date
```http
DELETE /date/{id}
```

### Cart

Get cart
```http
GET /cart/{clientId}
```

Add to cart
```http
POST /cart/{clientId}/add
Content-Type: application/json

{ "laptop_id": "LAPTOP_ID", "quantity": 2 }
```

Update cart item quantity
```http
PUT /contain/{itemId}
Content-Type: application/json

{ "quantity": 1 }
```

Remove cart item
```http
DELETE /cart/{clientId}/item/{itemId}
```

Checkout
```http
POST /cart/{clientId}/checkout
```

### Health & Docs

```http
GET http://localhost:5000/
GET http://localhost:5000/api-docs
```


