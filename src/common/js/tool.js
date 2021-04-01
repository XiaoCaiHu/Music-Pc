export function distinct(arr){
    let newArr=[];
    let isExist=false;
    for(let i=0,length=arr.length;i<length;i++){
  
      for(let j=i+1;j<length;j++){
        if(arr[i].name==arr[j].name){
          isExist=true;
          break;
        }
      }
      if(!isExist){
        newArr.push(arr[i]);
      }
      isExist=false;
    }
    return newArr;
  }