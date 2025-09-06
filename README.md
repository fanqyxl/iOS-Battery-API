Useless API to report a Apple devices battery level and for fetching the last reported value.

Requirements
- Bun

Quick start
1. Fill out .env

```
API_KEY=changme
```

2. Run the server with Bun:

```bash
bun run start
```

Apple Shortcuts

1. Open the Shortcuts app on iPhone iPad or Macbook.
2. Create a new shortcut and add these:
	- Get Battery Level
	- Get contents of URL ``http://localhost:3000/api/update/macbook``
	- Method: POST
	- Headers: `Key: Authorization` `Value: Bearer API_KEY`
    - Request Body: JSON, Key ``level``, Type ``number``, Value ``Battery Level``
3. Run the shortcut

Endpoints

- http://localhost:3000/api/update/macbook

- http://localhost:3000/api/status
