## Answers

1. What is the difference between Component and PureComponent? give an example where it might break my app.
```
- The difference is Pure component handles the `shouldComponentUpdate` itselft.
example: Adding a new prop to render but forget to update `shouldComponentUpdate`.
```
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
```
- Tbh, don't know :(
```

3. Describe 3 ways to pass information from a component to its parent
Answer:
```
- Pass a function as a prop to the child component, call the function and pass data as arguments and get that data in the parent component.
- The other ways I know to share data between components are context API and a state management like redux
```
4.  Give 2 ways to prevent components from re-rendering
Answer:
```
- using useMemo for values and useCallback for functions
```
5.  What is a fragment and why do we need it? Give an example where it might break my app.
Answer:
```
- fragment is a empty tag that allows to wrap children. We need them in order to avoid extra nodes. Adding a prop differente than the key prop might break the app.
```
6.  Give 3 examples of the HOC pattern.
Answer:
```
- One example is when passing props to the component when using redux throught the `connect` function. 
- Other example is having a parent component called `withStyles(Component)` that component will return `(props) =>  <Component styles={styles} {...props}/>`. `styles` is an object `const styles = {color: red}` defined in the return function then call it as `withStyles(newComponent)`
- finally, the structure mentioned above works for any other logic like passing transformed data before getting it in the expected component.
```
7.  what's the difference in handling exceptions in promises, callbacks and async...await.
Answer:
```
- I'd say the way they are handled. For promises the .catch() method is used when the promise is rejected. For async await is need the `try/catch` syntax to catch the error. For callbacks I don't know a way to catch an exception.
```
8.  How many arguments does setState take and why is it async.
Answer:
```
- 2 arguments, first one is the common value to update the state and the second value is a function that is ALWAYS run after the setState is run. As far as I it's asynchronous for permormance purposes since is in sync with props internally and consistent with it. 
```
9.  List the steps needed to migrate a Class to Function Component.
Answer:
```
- Get rid of the class keyword and define it as a function
- remove the constructor
- move the logic in the render method to the function return
- use const keyword before all methods
- remove all of the references made to 'this' keyword
- depeding on the react lifecycle methods used for class comopnent convert them to react hooks. Most of them can be defined within useState, useEffect hooks.
```
10.  List a few ways styles can be used with components.
Answer:
```
- inline styles `<div styles={{color: "red"}}>hello world</div>`
- define styles in a separe file and import it in the file where's needed. Add those classes defined in the css file to your html tags.
```
11.  How to render an HTML string coming from the server.
Answer:
```
- dangerouslySetInnerHTML does the trick
```
