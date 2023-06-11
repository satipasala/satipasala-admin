/**
 * mksort.js - Implements SQL style multi-key asc/desc sorting of object arrays
 * Author: Fil Baumanis ( @unfail, @bitless )
 */
import {OrderBy} from "../impl/FirebaseDataSource";

export class ArrayUtils {

  public static sortArray(objectArray: Array<any>, orderBy: OrderBy[]) {
    if(orderBy){
      objectArray.sort((a, b) => {

        let direction = -1;
        let count = orderBy.length;

        let asyncCount = 0;

        orderBy.forEach(order => {
          if (order.directionStr == 'asc' && a[order.fieldPath] > b[order.fieldPath]) {
            asyncCount += 1;
          }
        });

        if (count == asyncCount) {
          direction = 1;
        }
        return direction;
      });
    }


    return objectArray
  }

}
