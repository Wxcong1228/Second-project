import router from '../../router'

export let TSLD = (id) => {
    router.push({ 
        path: '/SongListDetail',
        query: {
            id: id,
          },
    })
}
