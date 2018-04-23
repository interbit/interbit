# Tutorials

<div class="tips danger">
  <p><span></span>Placeholder Text</p>
  <p>This content is placeholder text and needs expansion.</p>
</div>

Magna fugiat  deserunt, iPhone cliche humblebrag squid 8-bit coloring book vexillologist four loko bitters ex.  Laborum iceland beard edison bulb shoreditch.  Veniam kogi iPhone, XOXO umami la croix shoreditch laborum freegan sed odio squid tbh.  Sapiente vinyl nostrud vape edison bulb, shaman green juice celiac small batch vexillologist quinoa everyday carry labore vegan.  Marfa post-ironic squid, dolore readymade live-edge accusamus.  Umami aliqua celiac selfies lyft heirloom et af cliche, sustainable pinterest dolore air plant coloring book.  Echo park XOXO reprehenderit, culpa  drinking vinegar vape four loko ad typewriter.

# How to write a Smart Contract

<div class="tips danger">
  <p><span></span>Unfinished Content</p>
  <p>This content is unfinished and needs expansion.</p>
</div>

Smart contracts contain the business and processing logic, or functions, of the application.  Continuing the scenario from the previous section, a single smart contract would suffice:

```js
const smartContracts =  {
    lastAccidentDate: (state = Immutable.from(initialState.lastAccidentDate), action) => {
        if (action.type == actions.RESET) {
            state = new Date()
        }
        return state
    }
}
```
