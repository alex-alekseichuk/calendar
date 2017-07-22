
export function truncate(value:string, max:number, wordwise:boolean=true, tail:string='…'):string {
    if (!value) return '';

    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
            //Also remove . and , so its gives a cleaner result.
            if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                lastspace = lastspace - 1;
            }
            value = value.substr(0, lastspace);
        }
    }

    return value + tail;
}
