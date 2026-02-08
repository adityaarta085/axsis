# API Documentation

## Endpoints

### Auth
- `POST /api/auth/otp`: Request code.
- `POST /api/auth/verify`: Verify code and get JWT.

### Packages
- `GET /api/packages`: List all.
- `GET /api/packages/:id`: Get detail.

### Checkout
- `POST /api/checkout`: Create order.
- `POST /api/checkout/webhook`: Mock payment success/fail.

### User
- `GET /api/user/me`: Profile.
- `GET /api/user/transactions`: History.

### Content
- `GET /api/faqs`: Help content.
- `GET /api/blog`: News list.
- `GET /api/coverage`: Area check.
