Account signup modal. For now, set show={true} in the ModalWrapper component to display the modal.
```js
const { FormControl, Checkbox } = require('react-bootstrap');

const header = (
  <div>
    <h2>Sign up to access (app name)</h2>
    <p>Sign up with a link sent to your email (no passwordz), or use an authentication provider (Github), sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
);
const body = (
  <div>
    <ContentBar image="chairmanmeow.jpg" className="image-sm" title="Email">
      <FormControl type="text" placeholder="Enter your email address to sign in" />
      <Checkbox inline={false}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</Checkbox>
      <IconButton text="Continue" />
    </ContentBar>
    <ContentBar image="chairmanmeow.jpg" className="image-sm" title="Sign-up with GitHub">
      <Checkbox inline={false}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</Checkbox>
      <IconButton text="Continue" />
    </ContentBar>
  </div>
);
const footer = (
  <div>
    <a href="#" className="link-red">Cancel</a>
  </div>
);

<ModalWrapper header={header} body={body} footer={footer} />
```

Account App permissions modal
```js
const header2 = (
  <div>
    <ContentBar image="chairmanmeow.jpg" className="image-sm" title="App Name">
      <p>This information is being shared with (app name). Control access to your information, etc adipiscing elit, sed do eiusmod tempor inc.</p>
    </ContentBar>
  </div>
);
const body2 = (
  <ul>
    <li>
      <h4>Username / Alias:</h4>
      <p>BlueSteel</p>
    </li>
    <li>
      <h4>Email:</h4>
      <p>derek@reallyreallygoodlookingpeople.com</p>
    </li>
    <li>
      <IconButton className="destructive" text="Remove Access" />
    </li>
  </ul>
);
const footer2 = (
  <div>
    <a href="#">Cancel</a>
  </div>
);


<ModalWrapper header={header2} body={body2} footer={footer2} />
```
