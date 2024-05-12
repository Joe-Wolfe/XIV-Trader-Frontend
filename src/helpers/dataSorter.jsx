
//creates a copy to facilitate rerendering and sorting of data
function sortByParameter(data, parameter, ascending, checked) {
    if (!checked) {
        const dataCopy = data.slice();
        if (ascending) {
            return dataCopy.sort((a, b) => (a[parameter] > b[parameter]) ? 1 : -1);
        }
        return dataCopy.sort((a, b) => (a[parameter] < b[parameter]) ? 1 : -1);
    } else {
        const dataCopy = data.slice();
        if (ascending) {
            return dataCopy.sort((a, b) => (a[parameter] / a.cost > b[parameter] / b.cost) ? 1 : -1);
        }
        return dataCopy.sort((a, b) => (a[parameter] / a.cost < b[parameter] / b.cost) ? 1 : -1);
    }

}

export default sortByParameter;