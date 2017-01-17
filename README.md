use defineProperty to achieve mvvm


```javascript
Object.defineProperty(data, name, {
  get: () => {
    return bValue;
  },
  set: (newValue) => {
    bValue = newValue;
    this.bindRender(name);
  },
  enumerable: true,
  configurable: true
});
```