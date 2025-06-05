import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const TITLE_SUBFIX = " | Skill Transcript";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setDocumentTitle(title: string) {
  document.title = title + TITLE_SUBFIX;
}
