import * as _ from 'lodash';

export function processList(items: number[]): number[] {
    return _.uniq(items);
}
