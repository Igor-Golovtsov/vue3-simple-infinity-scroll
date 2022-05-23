#vue3-infinity-scroll

Infinity scroll is a simple component for vue 3 written in typescript and without dependencies.

### Installation:

```
npm install ********
```

### Props:

| Name          |                          Description                           |  Type   | Required | Default |
|:--------------|:--------------------------------------------------------------:|:-------:|:--------:|:-------:|
| `isInitRequest` |      For the first call, the value `true` is passed.       | boolean |   true   |  true   |
| `canLoad`       |       The value is `true` until all data is loaded.        | boolean |   true   |  true   |
| `isLoading`     | The value `true / false` is specified during data loading. | boolean |   true   |  true   |

### Events:

| Name           |                                      Description                                       |
|:---------------|:--------------------------------------------------------------------------------------:|
| `on-load-more` | Event is called when the lower part of the container has appeared in the visible area. |


### License
MIT License
