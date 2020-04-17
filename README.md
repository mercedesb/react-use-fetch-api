# react-use-fetch-api
An npm package that provides a React hook for making simple JSON API requests using the browser Fetch API

## Usage
The `useApi` React hook gives you access to 4 functions, `get`, `post`, `put`, and `del`. Simply import the hook into your component, and invoke it to return what you need. 

A common pattern is to destructure the return value, naming only which function you'll need in your component.

### Simple use cases
#### GET
```js
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
```js
import React from 'react'
import useApi from 'react-use-fetch-api'

export default function InterestingComponent() {
  const { post } = useApi()

  const onSubmit = () => {
    const newTodo = {
    userId: 1,
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
```js
import React from 'react'
import useApi from 'react-use-fetch-api'

export default function InterestingComponent() {
  const { put } = useApi()
  
  const onSubmit = () => {
    const updatedTodo = {
      userId: 1,
      title: "Gotta do all the things!",
      completed: false
    }
    
    post('https://jsonplaceholder.typicode.com/todos/1', updatedTodo).then(data => {
      // do something here like redirect the user or show a message or something
    })
  }

  return (
    // render your interesting component here
  )
}
```

#### DEL
```js
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

### Custom headers

All functions accept `data` and `headers` as optional parameters.  If you don't pass custom headers, the default will be:

```js
{
  "Content-Type": "application/json",
  Accept: "application/json"
}
```

To use custom headers:
```js
const customHeaders = {"Content-Language": "de-DE"}

get('https://jsonplaceholder.typicode.com/todos/1', customHeaders)

post('https://jsonplaceholder.typicode.com/todos/1', newTodo, customHeaders)

put('https://jsonplaceholder.typicode.com/todos/1', updatedTodo, customHeaders)

del('https://jsonplaceholder.typicode.com/todos/1', customHeaders)

```

To use custom headers with no data:
```js
const customHeaders = {"Content-Language": "de-DE"}

get('https://jsonplaceholder.typicode.com/todos/1', customHeaders)

post('https://jsonplaceholder.typicode.com/todos/1', null, customHeaders)

put('https://jsonplaceholder.typicode.com/todos/1', null, customHeaders)

del('https://jsonplaceholder.typicode.com/todos/1', customHeaders)

```

### Error handling
The `useApi` hook also allows you to gracefully handle error states.

It can take an onUnauthorized and/or an onError custom error handling function. 

If the API response comes back with HTTP status code 401 (Unauthorized), the useApi hook will invoke your onAuthorized handler if provided. 

For all other errors, the onError handler will be invoked if provided.

```js
import React, { useState } from 'react'
import useApi from 'react-use-fetch-api'

export default function InterestingComponent() {
  // you could also be fancy and create your own 
  // custom hooks for error handling 😉
  function onUnauthorized(err) {
    // handle the error here: remove a stale token, 
    // present a message to the user, etc.
  }

  function onError(err) {
    // handle the error here: present a message to the user, 
    // redirect them to a static page, etc.
  }

  const { get } = useApi(onUnauthorized, onError)

  // ... remaining component code removed for brevity
}
```

## Unit testing
The `useApi` hook can be easily mocked in tests. The following code uses Jest's `spyOn` but the same principle should work for other mocking libraries. (I'm also using enzyme in these code samples but that's definitely not required, react-testing-library is also great!)

You may want to test or use the return value of the `useApi` hook in an assertion.

```js
import { mount } from 'enzyme'
import * as useApiModule from 'react-use-fetch-api'
// ... other imports as needed

let mockReturnValue = {
  id: 1
}

jest.spyOn(useApiModule, 'useApi').mockImplementation(() => ({
  get: () => Promise.resolve(mockReturnValue)
}))

describe('InterestingComponent', () => {
  beforeEach(async () => {
    await act(async () => {
      subject = mount(<InterestingComponent />)
    })
    subject.update()
  })

  it('renders as expected', () => {
    expect(subject.find(ChildComponent)).toHaveLength(1) 
    expect(subject.find(ChildComponent).prop('id)).toEqual(mockReturnValue.id)
  })
})
```

If you are making a request after the user interacts with the component (button click, form submission, etc), you may want to check that the handler had been called with the expected parameters. 

```js
import { mount } from 'enzyme'
import * as useApiModule from 'react-use-fetch-api'
// ... other imports as needed

// important to store the mocked request function in a 
// variable so you have access to it in your assertions
let postSpy = jest.fn(() => Promise.resolve({}))
jest.spyOn(useApiModule, 'useApi').mockImplementation(() => ({
  post: postSpy
}))

describe('InterestingComponent', () => {
  describe('form submission', () => {
    beforeEach(() => {
      subject = mount(<AddNewPoetryEntry />)

      subject
        .find('form')
        .first()
        .simulate('submit', { preventDefault: jest.fn() })
    })

  it('calls useApi().post with the expected arguments', () => {
      expect(postSpy).toHaveBeenCalledWith(
        expect.stringContaining('expected string'),
        expect.objectContaining({
          // your expected object here
        })
      )
    })
  })
})
```

## Technologies used
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
