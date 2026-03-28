import { ServerResponse } from "node:http"

export function getRequestHeader(headers: NodeJS.Dict<string | string[]>, headerName: string): string | undefined {
  const headerLower = headerName.toLowerCase()
  return Object.entries(headers).find(
    ([key]) => key.toLowerCase() === headerLower
  )?.[1] as string | undefined
}

export function setResponseHeaders(res: ServerResponse, headers: Record<string, string>): void {
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value)
  })
}
