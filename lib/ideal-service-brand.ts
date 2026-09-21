// Rebrand display copy while preserving canonical URLs, asset paths and anchors.
export const idealServiceText = (text: string) => text.replace(/Auxano Solutions Technology Limited|Auxano Solutions|Auxano/gi, "Ideal Solutions");
export function idealServiceContent<T>(value: T, key = ""): T {
  if (["id", "slug", "href", "src", "serviceMixId"].includes(key)) return value;
  if (typeof value === "string") return idealServiceText(value) as T;
  if (Array.isArray(value)) return value.map(item => idealServiceContent(item)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([name,item]) => [name,idealServiceContent(item,name)])) as T;
  return value;
}
