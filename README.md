# react-use-fetch-api
An npm package that provides a React hook for making simple JSON API requests using the browser Fetch API

## Usage
The `useApi` React hook gives you access to 4 functions, `get`, `post`, `put`, and `del`. Simply import the hook into your component, and invoke it to return what you need. A common pattern is to destructure the return value, naming only what you'll need in your component.

### Simple use cases
#### GET
```
import React, { useState } from 'react'
import useApi from 'react-use-fetch-api'

export default function InterestingComponent() {
  const { get } = useApi()
  const [data, setData] = useState({})

  useEffect(() => {
    get('https://jsonplaceholder.typicode.com/todos/1').then(data => {
      setData(data)
    })
  }, [])

  return (
    // render your interesting component here
  )
}
```

#### POST
```
import React from 'react'
import useApi from 'react-use-fetch-api'

export default function InterestingComponent() {
  const { post } = useApi()

  const onSubmit = () => {
    const newTodo = {
    userId: 1,
    id: 2,
    title: "Gotta do all the things!",
    completed: false
  }

    post('https://jsonplaceholder.typicode.com/todos', newTodo).then(data => {
      // do something here like redirect the user or show a message or something
    })
  }

  return (
    // render your interesting component here
  )
}
```

#### PUT
```
import React from 'react'
import useApi from 'react-use-fetch-api'

export default function InterestingComponent() {
  const { put } = useApi()
  
  const onSubmit = () => {
    const updatedTodo = {
      userId: 1,
      id: 2,
      title: "Gotta do all the things!",
      completed: false
    }
    
    post('https://jsonplaceholder.typicode.com/todos', updatedTodo).then(data => {
      // do something here like redirect the user or show a message or something
    })
  }

  return (
    // render your interesting component here
  )
}
```

#### DEL
```
import React from 'react'
import useApi from 'react-use-fetch-api'

export default function InterestingComponent() {
  const { del } = useApi()

  const onDelete = () => {
    del('https://jsonplaceholder.typicode.com/todos/1').then(data => {
      // do something here like redirect the user or show a message or something
    })
  }

  return (
    // render your interesting component here
  )
}
```

### Error handling
The `useApi` hook can also take an onUnauthorized custom error handling function and an onError custom error handling function. If the API response comes back with HTTP status code 401 (Unauthorized), the useApi hook will invoke your onAuthorized handler if provided. For all other errors, the onError handler will be invoked if provided.

```
import React, { useState } from 'react'
import useApi from 'react-use-fetch-api'

export default function InterestingComponent() {
  // you could also be fancy and create your own custom hooks for your error handling 😉
  function onUnauthorized(err) {
    // handle the error here: remove a stale token, present a message to the user, etc.
  }

  function onError(err) {
    // handle the error here: present a message to the user, redirect them to a static page, etc.
  }

  const { get } = useApi(onUnauthorized, onError)
  const [data, setData] = useState({})

  useEffect(() => {
    get('https://jsonplaceholder.typicode.com/todos/1').then(data => {
      setData(data)
    })
  }, [])

  return (
    // render your interesting component here
  )
}
```

## Technologies used
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
