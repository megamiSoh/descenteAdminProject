import Cookies from 'js-cookie'
const pageInfo = {
  state: {
    search: Cookies.getJSON('search'),
    paging: Cookies.getJSON('paging'),
    list: Cookies.get('list')
  },

  mutations: {
    search: (state, data) => {
      Cookies.set('search', data)
      
      state.search = data
    },
    paging: (state, page) => {
      Cookies.set('paging', page)
      state.paging = page
    },
    list: (state, list) => {
      Cookies.set('list', list)
      state.list = list
    }
  },
}
export default pageInfo
