# Build and debug TypeScript ol-ext examples

## Setup environment

1. Clone this [types-ol-ext](https://github.com/Siedlerchr/types-ol-ext) git repository and install dependencies.

   ```bash
   git clone git@github.com:Siedlerchr/types-ol-ext.git
   cd types-ol-ext
   npm install
   ```

2. Clone [ol-ext](https://github.com/Viglino/ol-ext) git repository on `types-ol-ext` folder and install dependencies.

   ```bash
   cd /path/to/types-ol-ext
   git clone git@github.com:Viglino/ol-ext.git
   cd ol-ext
   npm install
   ```

3. Check whether original JavaScript ol-ext examples can be launched locally.

   ```bash
   cd /path/to/types-ol-ext
   cd ol-ext
   npm run start
   ```

   Then access [http://localhost:8181](http://localhost:8181) and check some examples.

   To stop the local server, press Ctrl+C on the terminal.

## Replace example html and build TypeScript

1. Replace ol-ext examples HTML `<script>` tag in `./ol-ext/examples/**/*.html`.

   ```bash
   cd /path/to/types-ol-ext
   npm run replace-examples
   ```

   - Only `ol`/`ol-ext` related `<script>` tags will be replaced.
   - Main example code will be backed up as `./ol-ext/examples/**/*.js.bak`.

2. Build examples TypeScript in `./examples/**/*.ts` to generate `./ol-ext/examples/**/*.js`.

   ```bash
   cd /path/to/types-ol-ext
   npm run build-examples
   ```

3. Check whether TypeScript ol-ext examples works correctly.

   ```bash
   cd /path/to/types-ol-ext
   cd ol-ext
   npx gulp serve
   ```

   - Currently, TypeScript ol-ext examples are a quite few.

## Port original JavaScript examples to TypeScript

1. Check still unported example in `./ol-ext/examples/**/*.html` which has `ol-ext` code.

   ```html
   :
   <script type="text/javascript">
     :
     var map = new ol.Map
     :
   </script>
   :
   ```

2. Create TypeScript file at same structure folder/path at `./examples/**/*.ts`, then paste above code part to the file.
3. Replace JavaScript to TypeScript and fix errors.

### Porting guide

1. jquery needs to be replaced to standard DOM selector.
   Here is some typical examples:
   - `$('xxx').val()` => `document.querySelector<HTMLXXXElement>('xxx')!.value`
   - `$('xxx').val('yyy')` => `document.querySelector<HTMLXXXElement>('xxx')!.value = 'yyy'`
   - `$('xxx').text()` => `document.querySelector<HTMLXXXElement>('xxx')!.textContent`
   - `$('xxx').prop('checked')` => `document.querySelector<HTMLInputElement>('xxx')!.checked`
2. To bridge TypeScript variable/function to HTML, override window object at the bottom of TypeScript code like as follows.

   ```ts
   declare global {
       interface Window {
           someVariable: VariableType,
           someFunction(t: string): void
       }
   }
   window.someVariable = someVariable;
   window.someFunction = (t: string) => {
       someFunction(t);
   }
   ```

   - `this` porting seems to be impossible in above function case, so consider to use 1st argument.

## Debug TypeScript code

To debug TypeScript code, adding `debugger;` statement to the place,
then reloading browser with opening browser debug tool (like Chrome DevTools)
seems to be the easiest way.
