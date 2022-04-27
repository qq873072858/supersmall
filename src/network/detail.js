import { request } from './request'

export async function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}