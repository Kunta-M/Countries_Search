/*
write your code here

list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();
get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/

const appRoot = document.getElementById('app_root');
const h1 = document.createElement('h1');
const p = document.createElement('p');
const input = document.createElement('input');
const label = document.createElement('label');
const select = document.createElement('select');
const option = document.createElement('option');
const form = document.createElement('form');
const table = document.createElement('table');
const thead = document.createElement('thead');
const tr = document.createElement('tr');
const th = document.createElement('th');
const tbody = document.createElement('tbody');
const td = document.createElement('td');
const div = document.createElement('div');
const img = document.createElement('img');
let selectedSearchType;
let selectedQuery;
let sortingOption = null;
let countryDataList = [];

form.setAttribute('id', 'form');
form.classList.add('form');

h1.textContent = 'Countries Search';
h1.classList.add('title');

let radioWrap = div.cloneNode();
radioWrap.classList.add('radio_wrap');

let radioElements = div.cloneNode();
radioElements.classList.add('radio_item');

let radioElementsRegionWrap = div.cloneNode();
radioElementsRegionWrap.classList.add('radio_region_wrap');

let radioElementsLanguageWrap = div.cloneNode();
radioElementsLanguageWrap.classList.add('radio_language_wrap');

let radioHeading = p.cloneNode();
radioHeading.textContent = 'Please choose the type of search:';
radioHeading.classList.add('radio_title');

let radioRegionLabel = label.cloneNode();
radioRegionLabel.textContent = 'By Region';
radioRegionLabel.setAttribute('for', 'region');

let radioRegion = input.cloneNode();
radioRegion.setAttribute('id', 'region');
radioRegion.setAttribute('name', 'criteria');
radioRegion.setAttribute('type', 'radio');
radioRegion.setAttribute('value', 'region');

let radioLanguageLabel = label.cloneNode();
radioLanguageLabel.textContent = 'By Language';
radioLanguageLabel.setAttribute('for', 'language');

let radioLanguage = input.cloneNode();
radioLanguage.setAttribute('id', 'language');
radioLanguage.setAttribute('name', 'criteria');
radioLanguage.setAttribute('type', 'radio');
radioLanguage.setAttribute('value', 'language');

let selectWrap = div.cloneNode();
selectWrap.classList.add('select_wrap');

let selectHeading = p.cloneNode();
selectHeading.textContent = 'Please choose search query:';
selectHeading.classList.add('select_title');

select.classList.add('select_style');

table.setAttribute('id', 'table');
table.classList.add('table');

form.append(h1, radioWrap, selectWrap);
radioWrap.append(radioHeading, radioElements);
radioElements.append(radioElementsRegionWrap, radioElementsLanguageWrap);
radioElementsRegionWrap.append(radioRegion, radioRegionLabel);
radioElementsLanguageWrap.append(radioLanguage, radioLanguageLabel);
selectWrap.append(selectHeading, select);

const defaultOption = option.cloneNode();
defaultOption.textContent = 'Select value';
defaultOption.setAttribute('selected', 'selected');
defaultOption.hidden = true;
select.append(defaultOption);

appRoot.prepend(form);
select.setAttribute('disabled', 'disabled');

let message = p.cloneNode();
message.classList.add('title');
form.after(message);

const generateSelectOptionList = (radio, service) => {
    message.textContent = 'No items, please choose search query';
    table.innerHTML = '';
    if (radio.checked) {
        selectedSearchType = radio.value;
        select.removeAttribute('disabled', 'disabled');
        select.innerHTML = '';
        select.append(defaultOption);
        for (let value of service) {
            const selectOption = option.cloneNode();
            selectOption.setAttribute('value', value)
            selectOption.textContent = value;
            select.append(selectOption)
        }
    }
}

radioRegion.addEventListener('click', () => {
    generateSelectOptionList(radioRegion, externalService.getRegionsList())
})

radioLanguage.addEventListener('click', () => {
    generateSelectOptionList(radioLanguage, externalService.getLanguagesList())
})

select.addEventListener('click', (event) => {
    let value = event.target.value;
    if (selectedQuery !== value) {
        selectedQuery = value;
        if (selectedQuery !== 'Select value') {
            drawTableHeader();
            switch (selectedSearchType) {
                case 'region':
                    countryDataList = externalService.getCountryListByRegion(selectedQuery)
                    break;
                case 'language':
                    countryDataList = externalService.getCountryListByLanguage(selectedQuery)
                    break;
                default:
                    break;
            }
            drawTableBody(countryDataList);
        }
    }
});

const drawTableHeader = () => {
    message.innerHTML = '';
    tr.innerHTML = '';
    let th1 = th.cloneNode();
    th1.textContent = 'Country name';
    th1.classList.add('th_sort');

    let th1DoubleArrow = div.cloneNode();
    th1DoubleArrow.innerHTML = '&#8597;';
    th1DoubleArrow.classList.add('arrow_double')

    th1DoubleArrow.addEventListener('click', () => {
        if (sortingOption !== 'ascName' && sortingOption !== 'descName') {
            sortingOption = 'ascName';
        } else if (sortingOption !== 'descName') {
            sortingOption = 'descName';
        } else {
            sortingOption = 'ascName';
        }

        th1DoubleArrow.innerHTML = sortingOption === 'ascName' ? '&#8595;' : '&#8593;';
        th5DoubleArrow.innerHTML = '&#8597;';

        countryDataList.sort((a, b) => {
            if (a.name > b.name) {
                return sortingOption === 'ascName' ? 1 : -1;
            }
            if (a.name < b.name) {
                return sortingOption === 'ascName' ? -1 : 1;
            }
            return 0;
        })
        drawTableBody(countryDataList);
    })

    th1.append(th1DoubleArrow);

    let th2 = th.cloneNode();
    th2.textContent = 'Capital';
    let th3 = th.cloneNode();
    th3.textContent = 'World Region';
    let th4 = th.cloneNode();
    th4.textContent = 'Languages';
    let th5 = th.cloneNode();
    th5.textContent = 'Area';
    th5.classList.add('th_sort');

    let th5DoubleArrow = div.cloneNode();
    th5DoubleArrow.innerHTML = '&#8597;';
    th5DoubleArrow.classList.add('arrow_double');
    th5DoubleArrow.addEventListener('click', () => {
        if (sortingOption !== 'ascArea' && sortingOption !== 'descArea') {
            sortingOption = 'ascArea';
        } else if (sortingOption !== 'descArea') {
            sortingOption = 'descArea';
        } else {
            sortingOption = 'ascArea';
        }

        th5DoubleArrow.innerHTML = sortingOption === 'ascArea' ? '&#8595;' : '&#8593;';
        th1DoubleArrow.innerHTML = '&#8597;';

        countryDataList.sort((a, b) => {
            return sortingOption === 'ascArea' ? a.area - b.area : b.area - a.area;
        })
        drawTableBody(countryDataList);
    })

    th5.append(th5DoubleArrow);

    let th6 = th.cloneNode();
    th6.textContent = 'Flag';

    appRoot.append(table);
    table.append(thead, tbody);
    thead.append(tr);
    tr.append(th1, th2, th3, th4, th5, th6)
};

const drawTableBody = (data) => {
    tbody.innerHTML = '';
    data.forEach(countryData => {
        let row = tr.cloneNode();
        tbody.append(row);

        let td1 = td.cloneNode();
        td1.textContent = countryData.name;

        let td2 = td.cloneNode();
        td2.textContent = countryData.capital;

        let td3 = td.cloneNode();
        td3.textContent = countryData.region;

        let td4 = td.cloneNode();
        td4.textContent = Object.values(countryData.languages).join(', ');

        let td5 = td.cloneNode();
        td5.textContent = countryData.area;

        let td6 = td.cloneNode();
        let countryImage = img.cloneNode();
        countryImage.setAttribute('src', countryData.flagURL);
        td6.append(countryImage);

        row.append(td1, td2, td3, td4, td5, td6);
    });
}