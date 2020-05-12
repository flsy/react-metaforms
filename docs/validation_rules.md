## Validation rules

### required

```json
{
  "type": "required",
  "message": "This field is required."
}
```

### mustbeequal
```json
{
  "type": "mustbeequal",
  "value": true,
  "message": "You need to agree to the terms and conditions"
}
```

### inlist
```json
{
  "type": "inlist",
  "value": ["Mr", "Mrs", "Ms", "Miss", "Dr", "Rev", "Prof"],
  "message": "Title was not a valid choice"
}
```
### maxlength
```json
{
  "type": "maxlength",
  "value": 32,
  "message": "Your username can only have 3 - 32 characters"
}
```

### minlength
```json
{
  "type": "minlength",
  "value": 3,
  "message": "Your username can only have 3 - 32 characters"
}
```
### pattern
```json
{
  "type": "pattern",
  "value": "^[a-zA-Z]+",
  "message": "Your username can only start with a letter"
}
```
### notpattern
```json
{
  "type": "notpattern",
  "value": "[\\-\\.\\_][\\-\\.\\_]",
  "message": "Your username can only contain letters and numbers"
}
```

### mustmatch
```json
{
  "type": "mustmatch",
  "value": "password",
  "message": "The passwords you entered didn't match. Please try again"
}
```
### mustmatchcaseinsensitive
```json
{
  "type": "mustmatchcaseinsensitive",
  "value": "email",
  "message": "Sorry, your email addresses do not match. Please try again"
}
```
