import Cookies from 'js-cookie'
const pageInfo = {
  state: {
    search: Cookies.get('data'),
    paging: Cookies.get('page'),
    list: Cookies.get('list')
  },

  mutations: {
    search: (state, data) => {
      Cookies.set('data', data)
      
      state.data = data
    },
    paging: (state, page) => {
      Cookies.set('page', page)
      state.page = page
    },
    list: (state, list) => {
      Cookies.set('list', list)
      state.list = list
    }
  },
}
export default pageInfo
