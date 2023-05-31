export function arrayBufferToBase64ImgSrc(buffer) {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/jpeg;base64,${window.btoa(binary)}`;
}

export function convertDate(date: Date) {
  const dateObject = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString(undefined, options);
  return formattedDate;
}
