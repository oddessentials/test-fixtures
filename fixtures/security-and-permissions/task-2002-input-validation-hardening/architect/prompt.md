The `/api/comments` endpoint allows users to post comments. Currently it accepts any payload.
Please enforce the following validation rules for the `content` field:
1. Required.
2. Must be a string.
3. Minimum length 1 character, maximum 500 characters.
4. Sanitize HTML tags to prevent XSS (e.g. using a sanitize library or simple regex strip).

Do not add new dependencies if possible, or use standard ones.
Do not change valid request handling.
