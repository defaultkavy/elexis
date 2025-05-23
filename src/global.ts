import type { $Node } from "#node/$Node";
import { $ } from './core';
declare global {
    /**
     * {@link $} is basic API interface to calling function, All major tools can be found in `$` properties.
     * This is also a feature-rich function to help you create and select elements.
     */
    var $:  $
    interface Array<T> {
        detype<F extends any, O>(...types: F[]): Array<Exclude<T, F | undefined | void>>
    }
    interface Set<T> {
        get array(): T[]
        sort(handler: ((a: T, b: T) => number) | undefined): T[];
    }
    type Nullish = null | undefined;
    type Ok<D> = [data: D, err: null];
    type Err<E> = [data: null, err: E]
    type Result<D, E> = Ok<D> | Err<E>
    type OrMatrix<T> = T | OrMatrix<T>[];
    type OrArray<T> = T | T[];
    type OrPromise<T> = T | Promise<T>;
    type OrNullish<T> = T | Nullish;
    type Mutable<T> = {
        -readonly [k in keyof T]: T[k];
     };
    type Types = 'string' | 'number' | 'boolean' | 'object' | 'symbol' | 'bigint' | 'function' | 'undefined'
    type Autocapitalize = 'none' | 'off' | 'sentences' | 'on' | 'words' | 'characters';
    type SelectionDirection = "forward" | "backward" | "none";
    type InputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
    type InputMode = "" | "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
    type ButtonType = "submit" | "reset" | "button" | "menu";
    type TextDirection = 'ltr' | 'rtl' | 'auto' | '';
    type ImageDecoding = "async" | "sync" | "auto";
    type ImageLoading = "eager" | "lazy";
    type ConstructorType<T> = { new (...args: any[]): T }
    interface Node {
        $: $Node;
    }
    type LanguageNativeMap = {
        "aa": "Afar",
        "ab": "Abkhazian",
        "ae": "Avestan",
        "af": "Afrikaans",
        "ak": "Akan",
        "am": "Amharic",
        "an": "Aragonese",
        "ar": "Arabic",
        "as": "Assamese",
        "av": "Avaric",
        "ay": "Aymara",
        "az": "Azerbaijani",
        "ba": "Bashkir",
        "be": "Belarusian",
        "bg": "Bulgarian",
        "bi": "Bislama",
        "bm": "Bambara",
        "bn": "Bengali",
        "bo": "Tibetan",
        "br": "Breton",
        "bs": "Bosnian",
        "ca": "Catalan",
        "ce": "Chechen",
        "ch": "Chamorro",
        "co": "Corsican",
        "cr": "Cree",
        "cs": "Czech",
        "cu": "Church Slavic",
        "cv": "Chuvash",
        "cy": "Welsh",
        "da": "Danish",
        "de": "German",
        "dv": "Divehi",
        "dz": "Dzongkha",
        "ee": "Ewe",
        "el": "Greek",
        "en": "English",
        "eo": "Esperanto",
        "es": "Spanish",
        "et": "Estonian",
        "eu": "Basque",
        "fa": "Persian",
        "ff": "Fulah",
        "fi": "Finnish",
        "fj": "Fijian",
        "fo": "Faroese",
        "fr": "French",
        "fy": "Western Frisian",
        "ga": "Irish",
        "gd": "Gaelic",
        "gl": "Galician",
        "gn": "Guarani",
        "gu": "Gujarati",
        "gv": "Manx",
        "ha": "Hausa",
        "he": "Hebrew",
        "hi": "Hindi",
        "ho": "Hiri Motu",
        "hr": "Croatian",
        "ht": "Haitian",
        "hu": "Hungarian",
        "hy": "Armenian",
        "hz": "Herero",
        "ia": "Interlingua",
        "id": "Indonesian",
        "ie": "Interlingue",
        "ig": "Igbo",
        "ii": "Sichuan Yi",
        "ik": "Inupiaq",
        "io": "Ido",
        "is": "Icelandic",
        "it": "Italian",
        "iu": "Inuktitut",
        "ja": "Japanese",
        "jv": "Javanese",
        "ka": "Georgian",
        "kg": "Kongo",
        "ki": "Kikuyu",
        "kj": "Kuanyama",
        "kk": "Kazakh",
        "kl": "Kalaallisut",
        "km": "Central Khmer",
        "kn": "Kannada",
        "ko": "Korean",
        "kr": "Kanuri",
        "ks": "Kashmiri",
        "ku": "Kurdish",
        "kv": "Komi",
        "kw": "Cornish",
        "ky": "Kirghiz",
        "la": "Latin",
        "lb": "Luxembourgish",
        "lg": "Ganda",
        "li": "Limburgan",
        "ln": "Lingala",
        "lo": "Lao",
        "lt": "Lithuanian",
        "lu": "Luba-Katanga",
        "lv": "Latvian",
        "mg": "Malagasy",
        "mh": "Marshallese",
        "mi": "Maori",
        "mk": "Macedonian",
        "ml": "Malayalam",
        "mn": "Mongolian",
        "mr": "Marathi",
        "ms": "Malay",
        "mt": "Maltese",
        "my": "Burmese",
        "na": "Nauru",
        "nb": "Bokmål, Norwegian",
        "nd": "Ndebele, North",
        "ne": "Nepali",
        "ng": "Ndonga",
        "nl": "Dutch",
        "nn": "Norwegian Nynorsk",
        "no": "Norwegian",
        "nr": "Ndebele, South",
        "nv": "Navajo",
        "ny": "Chichewa",
        "oc": "Occitan",
        "oj": "Ojibwa",
        "om": "Oromo",
        "or": "Oriya",
        "os": "Ossetian",
        "pa": "Panjabi",
        "pi": "Pali",
        "pl": "Polish",
        "ps": "Pushto",
        "pt": "Portuguese",
        "qu": "Quechua",
        "rm": "Romansh",
        "rn": "Rundi",
        "ro": "Romanian",
        "ru": "Russian",
        "rw": "Kinyarwanda",
        "sa": "Sanskrit",
        "sc": "Sardinian",
        "sd": "Sindhi",
        "se": "Northern Sami",
        "sg": "Sango",
        "si": "Sinhala",
        "sk": "Slovak",
        "sl": "Slovenian",
        "sm": "Samoan",
        "sn": "Shona",
        "so": "Somali",
        "sq": "Albanian",
        "sr": "Serbian",
        "ss": "Swati",
        "st": "Sotho, Southern",
        "su": "Sundanese",
        "sv": "Swedish",
        "sw": "Swahili",
        "ta": "Tamil",
        "te": "Telugu",
        "tg": "Tajik",
        "th": "Thai",
        "ti": "Tigrinya",
        "tk": "Turkmen",
        "tl": "Tagalog",
        "tn": "Tswana",
        "to": "Tonga",
        "tr": "Turkish",
        "ts": "Tsonga",
        "tt": "Tatar",
        "tw": "Twi",
        "ty": "Tahitian",
        "ug": "Uighur",
        "uk": "Ukrainian",
        "ur": "Urdu",
        "uz": "Uzbek",
        "ve": "Venda",
        "vi": "Vietnamese",
        "vo": "Volapük",
        "wa": "Walloon",
        "wo": "Wolof",
        "xh": "Xhosa",
        "yi": "Yiddish",
        "yo": "Yoruba",
        "za": "Zhuang",
        "zh": "Chinese",
        "zu": "Zulu"
    }
    type LanguageVariantMap = {
        "ar-ae": "Arabic (U.A.E.)",
        "ar-bh": "Arabic (Bahrain)",
        "ar-dz": "Arabic (Algeria)",
        "ar-eg": "Arabic (Egypt)",
        "ar-iq": "Arabic (Iraq)",
        "ar-jo": "Arabic (Jordan)",
        "ar-kw": "Arabic (Kuwait)",
        "ar-lb": "Arabic (Lebanon)",
        "ar-ly": "Arabic (Libya)",
        "ar-ma": "Arabic (Morocco)",
        "ar-om": "Arabic (Oman)",
        "ar-qa": "Arabic (Qatar)",
        "ar-sa": "Arabic (Saudi Arabia)",
        "ar-sy": "Arabic (Syria)",
        "ar-tn": "Arabic (Tunisia)",
        "ar-ye": "Arabic (Yemen)",
        "de-at": "German (Austria)",
        "de-ch": "German (Switzerland)",
        "de-de": "German (Germany)",
        "de-li": "German (Liechtenstein)",
        "de-lu": "German (Luxembourg)",
        "en-au": "English (Australia)",
        "en-bz": "English (Belize)",
        "en-ca": "English (Canada)",
        "en-cb": "English (Caribbean)",
        "en-gb": "English (United Kingdom)",
        "en-ie": "English (Ireland)",
        "en-jm": "English (Jamaica)",
        "en-nz": "English (New Zealand)",
        "en-ph": "English (Philippines)",
        "en-tt": "English (Trinidad and Tobago)",
        "en-us": "English (United States)",
        "en-za": "English (South Africa)",
        "en-zw": "English (Zimbabwe)",
        "es-ar": "Spanish (Argentina)",
        "es-bo": "Spanish (Bolivia)",
        "es-cl": "Spanish (Chile)",
        "es-co": "Spanish (Colombia)",
        "es-cr": "Spanish (Costa Rica)",
        "es-do": "Spanish (Dominican Republic)",
        "es-ec": "Spanish (Ecuador)",
        "es-es": "Spanish (Spain)",
        "es-gt": "Spanish (Guatemala)",
        "es-hn": "Spanish (Honduras)",
        "es-mx": "Spanish (Mexico)",
        "es-ni": "Spanish (Nicaragua)",
        "es-pa": "Spanish (Panama)",
        "es-pe": "Spanish (Peru)",
        "es-pr": "Spanish (Puerto Rico)",
        "es-py": "Spanish (Paraguay)",
        "es-sv": "Spanish (El Salvador)",
        "es-us": "Spanish (United States)",
        "es-uy": "Spanish (Uruguay)",
        "es-ve": "Spanish (Venezuela)",
        "fr-be": "French (Belgium)",
        "fr-ca": "French (Canada)",
        "fr-ch": "French (Switzerland)",
        "fr-fr": "French (France)",
        "fr-lu": "French (Luxembourg)",
        "fr-mc": "French (Monaco)",
        "hr-ba": "Croatian (Bosnia and Herzegovina)",
        "hr-hr": "Croatian (Croatia)",
        "it-ch": "Italian (Switzerland)",
        "it-it": "Italian (Italy)",
        "ms-bn": "Malay (Brunei Darussalam)",
        "ms-my": "Malay (Malaysia)",
        "nl-be": "Dutch (Belgium)",
        "nl-nl": "Dutch (Netherlands)",
        "pt-br": "Portuguese (Brazil)",
        "pt-pt": "Portuguese (Portugal)",
        "qu-bo": "Quechua (Bolivia)",
        "qu-ec": "Quechua (Ecuador)",
        "qu-pe": "Quechua (Peru)",
        "se-fi": "Sami (Finland)",
        "se-no": "Sami (Norway)",
        "se-se": "Sami (Sweden)",
        "sr-ba": "Serbian (Bosnia and Herzegovina)",
        "sr-sp": "Serbian (Serbia and Montenegro)",
        "sv-fi": "Swedish (Finland)",
        "sv-se": "Swedish (Sweden)",
        "zh-cn": "Chinese (China)",
        "zh-hk": "Chinese (Hong Kong SAR)",
        "zh-mo": "Chinese (Macau SAR)",
        "zh-sg": "Chinese (Singapore)",
        "zh-tw": "Chinese (Taiwan)",
    }
    type LanguageMap = LanguageNativeMap & LanguageVariantMap;

}
Array.prototype.detype = function <T extends any, O>(this: O[], ...types: T[]) {
    return this.filter(item => {
        if (!types.length) return item !== undefined;
        else for (const type of types) if (typeof item !== typeof type) return true;  else return false;
    }) as Exclude<O, T | undefined | void>[];
}
Object.defineProperties(Set.prototype, {
    array: { configurable: true, get: function <T>(this: Set<T>) { return Array.from(this)} }
})
Set.prototype.sort = function <T>(this: Set<T>, handler: ((a: T, b: T) => number) | undefined) { return this.array.sort(handler)}

globalThis.$ = $;