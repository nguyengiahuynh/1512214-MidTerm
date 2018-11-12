import {format, compareDesc} from 'date-fns/esm'

export function createIDChat(UID_a, UID_b) {
  if (UID_a > UID_b)
    return UID_a + UID_b;
  return UID_b + UID_a;
}

export function sortTimeChatDesc(arr) {
  arr.sort(compareDesc)
}