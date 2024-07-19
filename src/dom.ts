export function prepareMap() {
  const map = document.querySelector<HTMLDivElement>("#map-content");
  if (map) {
    map.innerHTML = "";
  }
}
