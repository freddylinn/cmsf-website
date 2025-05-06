# Colorado Motor Speech Framework Scoring Form

### Table of Contents

---

- [GitHub Structure](#github-structure)
- [Technologies Used](#technologies-used)
- [Adding New Pages](#adding-new-pages)
- [Changing Data From GitHub](#changing-data-from-github)
- [JSON Data](#json-data)

### GitHub Structure

---

- The `main` branch contains the source code for the website that can be changed
- The `gh-pages` branch contains the code after it is built and ready to be deployed as a webpage. This code is automatically generated and deployed when changes to `main` are made

### Technologies Used

- ReactJS for developing pages
- TailwindCSS for styling

### Adding New Pages

---

#### Making a New Page File

- All pages are located in the `src/pages` directory and are typically `.js` files for ReactJS (JSX formatting)
- A basic page file can look like this:

```
function PageName() {
	return (
	<>
		<h1 className="text-4xl font-bold mt-8">Header</h1>
		<p>paragraph content</p>
    </>
  );
}

export default PageName;
```

#### Adding a Page to the Router

Once a page's file has been created, the page needs to be added to the site's router so that it has a reachable URL. For example, the CMSF tool can be found at `cmsf.info/#/tool`

- Pages can be added to the router by editing `src/App.js`
- The new page should follow this format and be put in between the other route elements: `<Route path="/PageName" element={<PageName />} />`
- **Note:** The name put for `element` must match the name that is exported from the page's file. The `path` can be any name that seems most intuitive to put in the URL.

#### Adding a Page to The Navbar

Now that the page has been added to the router, it needs a way to be easily accessible. This can be done by adding it to the navbar, which will automatically show at the top of all pages.

- Pages can be added to the navbar by editing `src/components/NavBar.js`
- Each new navbar item should be indented within the `div` element and follow this format: `<a href="#/PageNameHere" className="mx-6 text-md md:text-xl font-semibold hover:underline">Page Title Here</a>`
- **Note:** The value put in `href` must match what was chosen for `path` in the router. This controls where the link will go. The "page title" is the text that will be displayed in the navbar to the user.

### Changing Data From GitHub

---

- Navigate to the `src` folder on the main branch in GitHub
- From there, navigate to the `data` folder
- Click on the JSON file you would like to edit
- Near the top right of the page, find the pencil icon for the "**edit this file**" button
  - Optionally, click the arrow next to this button and select "open with github.dev". This will provide extra features and show errors before they are published
- Edit the file as needed
- After changes have been made, click the green "**commit changes**" button in the top right
- Change the commit message to a short summary of what was changed
- Ensure that the "commit directly to the main branch" option is selected
- Click the green "**commit changes**" button in the bottom right of the box to confirm

##### After Committing Changes

- Changes will automatically publish to the website after a few minutes
- The most recent change can be reviewed by clicking on your commit message from the homepage of the github repository
  - This can be found above all of the files and will be next to your github username in the top center of the screen
- A list of ALL changes can be viewed by clicking the counterclockwise clock icon with the number of commits next to it

### JSON Data

---

The JSON data can be found at this path in the `main` branch:

- `src`/
  - `data`/
    - `characteristics.json` (All yes/no characteristic groups, their scoring values, and extra notes)
    - `custom.json` (characteristics that are more than just Yes/No)
    - `locations.json` (physical locations and conditions for those areas)
    - `tasks.json` (tasks for each characteristic)

##### `characteristics.json`

Example snippet from this file:

```
"Rate of Speech": {

	"Slow rate of speech": [
		[1,"(can be compensatory or primary)"],
		[1, "(uncommon)"],
		[2, ""],
		[0, ""],
		[1, ""],
		[1, ""],
		[1, ""]
	],
	"Fast rate of speech": [

		[...]

}

```

`Rate of Speech` is the characteristic group name and will be displayed as the group title

- `Slow rate of speech` and `Fast Rate of Speech` are individual characteristics/rows within this grouping
  - Each characteristic/row contains an array of values corresponding to each column, ultimately providing data for the cell at that row/column intersection
    - The columns are currently `Flaccid, UUMN, Spastic, Hypokinetic, Hyperkinetic, Ataxic, Apraxia of Speech` which is why each characteristic has an array with 7 elements
  - Each cell uses an array of 2 values, the first being the score and the second being notes for that cell
    - -1 = red/"-", 0 = neutral, 1 = yellow/"X", 2 = green/"XX"

If adding a new **row**, it is usually easiest to copy and paste this template underneath the last row in a group and then change values from there. A comma will need to be added to the last row before adding in a new one.

```
	"(row name here)": [
		[0, ""],
		[0, ""],
		[0, ""],
		[0, ""],
		[0, ""],
		[0, ""],
		[0, ""]
	]
```

If adding a new column, a new element would have to be added to each row containing the data for that column. It would need to be inserted in the same position as the new column, so if the new column was at the end, we would add a new `[0, ""]` at the end of each row. The column would also have to be added in locations.json in order to show up correctly

##### `custom.json`

Currently, `custom.json` handles two `type` values: `number` and `select`. `number` handles all numerical values and can be set to either be a score out of a certain number or out of a certain percentage. `select` handles characteristics that have a set list of options, such as low, moderate, high. Each type must have the structures shown below.

###### `number` example

```
"Self-Rating": {
	"type": "number",
	"max": 7,
	"value": "number",
	"tip": "Ask the patient: 'On a scale of 1-7, 1 being the worst and 7 being the best, how would you rate your speech right now?'"
},
```

- `"type"` is set to `number`
- `"max"` represents the highest score, in this case 7
- `"value"` can either be `number` or `percentage`, which will define which units to use for the score
- `"tip"` contains the information that will be shown when the user hovers over the 'i' icon next to each characteristic
- The minimum is automatically set to 0
- `"max"` and `"value"` are exclusive to this type

###### `select` example

```
"Naturalness": {
	"type": "select",
	"options": ["WFL", "Mild", "Moderate", "Severe", "Profound"],
	"tip": "Judge during running speech of how well speech matches normal stands of rate, pitch, and loudness."

},
```

- `"type"` is set to `select`
- `"options"` is an array containing each option shown to the user, each of which must be wrapped in quotes and separated by commas
- `"tip"` has the same usage as it does for number values
- `"options"` is exclusive to this type

##### `locations.json`

Each entry in this file maps a location to a group of conditions that apply to that location, such as `"Upper Motor Neuron": ["UUMN","Spastic"]`

##### `tasks.json`

Each entry in this file maps a group name to the tasks for that characteristic group. `\n` is used within the text to create a new line, whereas `\"` is used to add quotations, since the overall text itself is wrapped in normal double quotes. The group names MUST match the exact name in `characteristics.json`

Example entry: `"OME (Larynx)": "\"Cough\" \n \"Say 'uh-oh'\" (Listen to patient inhaling)"`
