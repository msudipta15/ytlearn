export function checklink(link: string) {
  if (link.includes("youtube.com") || link.includes("youtu.be")) {
    return true;
  } else {
    return false;
  }
}
