import fetch from '@/utils/member'

export function getList() {
  fetch({
    url: '/user/GetUsers',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      search: {
        id: null,
        account: null,
        name: null,
        isMale: null,
        searchColumn: null,
        startDate: null,
        endDate: null
      },
      paging: {
        page: 1,
        pageSize: 20,
        totalPages: 0,
        totalRecodes: 0,
        orderBy: 'id',
        ascending: false
      },
      result: null
    }
    // params: query
  })
}
export function getUser() {
  fetch({
    url: '/user/GetUsers',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  })
}
