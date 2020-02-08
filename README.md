#Tool Set-up instructions

#Configuration instructions
To add extra attributes to each annotation, do the following.

In the provided .config file, provide any input html you would like
annotator to be able to select from.

The name of the input tag will be the property name that is saved and
the value will be the respectively value that is saved. Please ensure that all names are unique.

Please use no double quotes(") in the config file, only use single quotes(')

Any type of inputs should work, but the tool is made for text, range, checkbox, and radio

Example:
  <h4>Select the Gender of the character</h4>
  <input type='radio' name="gender" value='male' checked> Male
  <input type='radio' name='gender' value='female'> Female
  <input type='radio' name='gender' value='other'> Other
  
  <h4>Briefly describe the environment the character is in</h4>
  <input type='text' name="environment">

  If "other" is selected, the saved attribute will be "gender: other"
