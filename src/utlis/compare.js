import _ from "lodash";

const compare = (array=[], complete) => {
  const newobject={}
  const array2 =array.map(([first, last,nameofobject]) => {

    if (first === null||first===undefined) {
      switch (typeof last) {
        case "string":
          return ["", last,nameofobject];
        case "number":
          return [0, last,nameofobject];
        case "boolean":
          return [false, last,nameofobject];
      }
    } else if (last === null||last===undefined) {
      switch (typeof first) {
        case "string":
          return [first, "",nameofobject];
        case "number":
          return [first, 0,nameofobject];
        case "boolean":
          return [first, false,nameofobject];
      }
    } else {
      return [first,last,nameofobject];
    }

  });
 let filterarray= array2.filter(([item1, item2,nameofobject])=>!_.isEqual(item1, item2))
 
// array2.map(([item1, item2,nameofobject])=>{
//  return !_.isEqual(item1, item2)?{[nameofobject]:[item1,item2]}:""
// })
filterarray.forEach(([item1, item2,nameofobject])=>newobject[nameofobject]=item1)

  return{nochange:array2[complete ? "every" : "some"](([item1, item2,nameofobject]) => {
    return !_.isEqual(item1, item2);
  }),array:newobject};
  
};

export default compare;