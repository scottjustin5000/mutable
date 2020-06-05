# mutable
 react component for drag/drop and resizing
 wrap whatever you want to drag and resize
 ### usage

 ```
<Mutable>
    <AwesomeComponent />
</Mutable>
 ```

  ```
<Mutable>
    <AwesomeComponent
      top='100px',
      left='100px',
      width='100px',
      height='100px',
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onResize={onResize}
      />
</Mutable>
 ```

 Whatever awesome component that is wrapped by mutable and needs to be resizable should not have an explicit height and width set or should be set to a width and height of 100%.

