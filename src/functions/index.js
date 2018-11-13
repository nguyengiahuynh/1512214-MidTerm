import isImageUrl from 'is-image-url' 

export function createIDChat(UID_a, UID_b) {
  if (UID_a > UID_b)
    return UID_a + UID_b;
  return UID_b + UID_a;
}

export function parseImg(content) {
  let arr = [];
  let result = '';
  console.log(content);
  arr = content.split(' ')
  console.log(arr);
  arr.map((item, key) => {
    if (isImageUrl(item)) {
      let temp =  `<a href="${item}"><img width="150" src="${item}" alt="img-chat" /></a>`;
      result += " ";
      result += temp;
      result += " ";
    } 
    else {
      result += " ";
      result += item;
    }
  })
  console.log(result)
  return result
}