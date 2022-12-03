// tslint:disable-next-line: typedef
export function filterTable() {
  const filterFunction = (data: any, filter: string): boolean => {
    const searchTerms = JSON.parse(filter);
    let isFilterSet = false;
    for (const col in searchTerms) {
      if (searchTerms[col].toString() !== '') {
        isFilterSet = true;
      } else {
        delete searchTerms[col];
      }
    }

    const nameSearch = () => {
      let found = false;
      if (isFilterSet) {
        // tslint:disable-next-line: forin
        for (const col in searchTerms) {
          searchTerms[col]
            .trim()
            .toLocaleLowerCase()
            .split(' ')
            .forEach((word) => {
              if (
                data[col] !== undefined &&
                data[col].toString().toLocaleLowerCase().indexOf(word) !== -1 &&
                isFilterSet &&
                word
              ) {
                found = true;
              }
            });
        }
        return found;
      } else {
        return true;
      }
    };
    return nameSearch();
  };
  return filterFunction;
}
