# API Documentation Template

Generate comprehensive, developer-friendly API documentation from code.

## Use Cases
- Documenting REST APIs
- Creating OpenAPI/Swagger specs
- Generating SDK documentation
- Writing API reference guides
- Creating integration examples

## Template

```xml
<task>Generate comprehensive API documentation for this code</task>

<code>
[PASTE YOUR API CODE HERE - can be routes, endpoints, functions, or entire API files]
</code>

<api_type>
[REST API / GraphQL / gRPC / WebSocket / SDK / Other]
</api_type>

<thinking>
Analyze the code to identify:
1. All endpoints/methods and their purposes
2. Request/response structures
3. Authentication requirements
4. Error handling patterns
5. Rate limits or constraints
</thinking>

<documentation_requirements>
- Clear endpoint descriptions
- Request/response examples with real data
- Authentication details
- Error codes and meanings
- Rate limiting information
- Code examples in multiple languages (if applicable)
</documentation_requirements>

<output_format>
For each endpoint/method provide:

1. **Endpoint Overview**
   - HTTP method and path (or function signature)
   - Brief description (one sentence)
   - Authentication required (yes/no)

2. **Parameters**
   - Path parameters
   - Query parameters
   - Request body (with types)
   - Headers required

3. **Request Example**
   ```
   [Include curl, JavaScript, Python examples]
   ```

4. **Response**
   - Success response (with example)
   - Status codes
   - Response headers

5. **Error Handling**
   - Possible error codes
   - Error response format
   - Common errors and solutions

6. **Notes**
   - Rate limits
   - Pagination (if applicable)
   - Deprecation warnings
   - Best practices
</output_format>
```

## Example Usage

### Input
```xml
<task>Generate comprehensive API documentation for this code</task>

<code>
@app.route('/api/users/<int:user_id>', methods=['GET'])
@require_auth
def get_user(user_id):
    """Fetch user by ID"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'created_at': user.created_at.isoformat()
    }), 200

@app.route('/api/users', methods=['POST'])
@require_auth
def create_user():
    """Create a new user"""
    data = request.get_json()

    # Validation
    if not data.get('name') or not data.get('email'):
        return jsonify({'error': 'Name and email required'}), 400

    # Check if user exists
    existing = db.query(User).filter(User.email == data['email']).first()
    if existing:
        return jsonify({'error': 'Email already registered'}), 409

    user = User(name=data['name'], email=data['email'])
    db.add(user)
    db.commit()

    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
    }), 201
</code>

<api_type>REST API</api_type>

<thinking>
Analyze the code to identify:
1. All endpoints/methods and their purposes
2. Request/response structures
3. Authentication requirements
4. Error handling patterns
5. Rate limits or constraints
</thinking>

<documentation_requirements>
- Clear endpoint descriptions
- Request/response examples with real data
- Authentication details
- Error codes and meanings
- Code examples in multiple languages
</documentation_requirements>

<output_format>
[As specified above]
</output_format>
```

### Expected Output

# User API Documentation

## Authentication

All endpoints require authentication. Include your API key in the `Authorization` header:
```
Authorization: Bearer YOUR_API_KEY
```

---

## Get User by ID

Retrieve detailed information about a specific user.

**Endpoint:** `GET /api/users/{user_id}`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | integer | Yes | The unique identifier of the user |

### Request Example

**cURL**
```bash
curl -X GET "https://api.example.com/api/users/123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**JavaScript (Fetch)**
```javascript
fetch('https://api.example.com/api/users/123', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

**Python (Requests)**
```python
import requests

headers = {'Authorization': 'Bearer YOUR_API_KEY'}
response = requests.get('https://api.example.com/api/users/123', headers=headers)
user = response.json()
```

### Success Response

**Status Code:** `200 OK`

```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | User's unique identifier |
| `name` | string | User's full name |
| `email` | string | User's email address |
| `created_at` | string (ISO 8601) | Account creation timestamp |

### Error Responses

**User Not Found**

**Status Code:** `404 Not Found`

```json
{
  "error": "User not found"
}
```

**Unauthorized**

**Status Code:** `401 Unauthorized`

```json
{
  "error": "Invalid or missing API key"
}
```

### Notes
- Rate limit: 100 requests per minute
- User emails are only visible to authenticated users
- Deleted users return a 404 error

---

## Create User

Create a new user account.

**Endpoint:** `POST /api/users`

**Authentication:** Required

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | User's full name (2-100 characters) |
| `email` | string | Yes | Valid email address (must be unique) |

### Request Example

**cURL**
```bash
curl -X POST "https://api.example.com/api/users" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com"
  }'
```

**JavaScript (Fetch)**
```javascript
fetch('https://api.example.com/api/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

**Python (Requests)**
```python
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

data = {
    'name': 'Jane Smith',
    'email': 'jane@example.com'
}

response = requests.post(
    'https://api.example.com/api/users',
    headers=headers,
    json=data
)

user = response.json()
```

### Success Response

**Status Code:** `201 Created`

```json
{
  "id": 124,
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

### Error Responses

**Validation Error**

**Status Code:** `400 Bad Request`

```json
{
  "error": "Name and email required"
}
```

**Duplicate Email**

**Status Code:** `409 Conflict`

```json
{
  "error": "Email already registered"
}
```

**Unauthorized**

**Status Code:** `401 Unauthorized`

```json
{
  "error": "Invalid or missing API key"
}
```

### Notes
- Passwords are set via separate endpoint or email verification
- Email validation is performed server-side
- Rate limit: 10 user creations per hour per API key
- Created users are immediately active

---

## Common Error Codes

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 400 | Bad Request | Missing required fields, invalid data format |
| 401 | Unauthorized | Missing or invalid API key |
| 404 | Not Found | User ID doesn't exist |
| 409 | Conflict | Email already registered |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side issue (contact support) |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| GET /api/users/{user_id} | 100 requests/minute |
| POST /api/users | 10 requests/hour |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1642252800
```

---

## Changelog

**v1.1.0** (2024-01-15)
- Added email validation
- Improved error messages
- Added rate limit headers

**v1.0.0** (2024-01-01)
- Initial release

---

## Tips for Best Results

1. **Include full code** - Routes, models, validation logic
2. **Specify API type** - REST, GraphQL, gRPC, etc.
3. **Mention framework** - Flask, Express, FastAPI, etc.
4. **Include auth logic** - How authentication works
5. **Request examples in your preferred languages** - Specify in prompt

## Variations

### For GraphQL APIs
```xml
<api_type>GraphQL</api_type>

<additional_requirements>
- Include schema definitions
- Provide example queries and mutations
- Document resolvers
- Show pagination patterns
</additional_requirements>
```

### For SDK Documentation
```xml
<task>Generate SDK documentation for this library</task>

<focus>
- Class/function signatures
- Usage examples
- Initialization patterns
- Common workflows
- Best practices
</focus>
```

## Related Templates

- [Code Review](code-review.md) - Review API code quality
- [Unit Tests](unit-tests.md) - Generate API tests
- [Technical Documentation](../writing/technical-docs.md) - General technical writing

---

**Back to [Main README](../README.md)**
