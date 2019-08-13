// const colorPicker = document.getElementById('color');

// colorPicker.addEventListener('change', e => {
//   document.body.style.setProperty('--main-bg', colorPicker.value);
// });

const themes = {
  white: {
    '--box-bg': 'white',
    '--box-text-color': 'black',
  },
  black: {
    '--box-bg': 'black',
    '--box-text-color': 'white',
  },
};

const customThemes = ['--box-bg', '--box-text-color'];

(function (customThemes) {
  const container = document.querySelector('.customThemeForm');
  const fragment = document.createDocumentFragment();
  customThemes.forEach(theme => {
    const item = document.createElement('div');
    item.classList.add('.controls-item');
    const label = document.createElement('label');
    label.innerHTML = theme;
    const input = document.createElement('input');
    input.setAttribute('type', 'color');
    input.setAttribute('data-var', theme);
    input.id = 'color' + theme;
    input.style.marginBottom = '20px';
    input.style.marginLeft = '10px';
    label.setAttribute('for', input.id);
    item.appendChild(label);
    item.appendChild(input);
    fragment.appendChild(item);
  })
  container.appendChild(fragment);

})(customThemes);

const themeSelect = document.getElementById('themes');
const form = document.forms['customThemeFrom'];
const colorInputs = document.querySelectorAll('[data-var]');
const inputThemeName = form.elements['themeName'];

themeSelect.addEventListener('change', e => {
  const themeVariables = themes[themeSelect.value];
  Object.entries(themeVariables).forEach(([key, value]) => {
    document.body.style.setProperty(key, value);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const newTheme = {};
  let checkTheme = Object.keys(themes).find(item => item === inputThemeName.value.toLowerCase());
  if (inputThemeName.value !== '' && !checkTheme) {
    const newThemeName = inputThemeName.value;
    colorInputs.forEach(input => {
      const key = input.dataset.var;
      const value = input.value;
      newTheme[key] = value;
    });

    themes[newThemeName] = newTheme;
    const newSelectOption = new Option(newThemeName, newThemeName);
    themeSelect.appendChild(newSelectOption);
    form.reset();
  } else {
    alert('Theme name is incorrect');
  }

});
