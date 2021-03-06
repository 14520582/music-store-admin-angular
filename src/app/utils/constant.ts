export class Constant {
    public static API_PREFIX = 'http://localhost:9998/musicstore/';
    public static URL_GET_ALL_DATA1 = "http://www.mocky.io/v2/5aaa3a98330000bb082da7e6";
    public static URL_GET_ALL_DATA = "http://www.mocky.io/v2/5afd293c3200008300f1aa65"
    public static URL_GET_NEWS = "http://www.mocky.io/v2/5aeefaa72f00001000739b65";
    public static URL_GET_ALL_BOOK = "http://www.mocky.io/v2/5ab367382f00006000ca36df";
    public static SERVER = "http://localhost:8080/musicstore/"
    public static PAGE_SIZE: number = 10;
    public static CAROUSEL_SIZE: number = 4;
    public static MY_DATE_FORMATS = {
        parse: {
            dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
        },
        display: {
            // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
            dateInput: 'input',
            monthYearLabel: {year: 'numeric', month: 'short'},
            dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
            monthYearA11yLabel: {year: 'numeric', month: 'long'},
        }
    };
 }