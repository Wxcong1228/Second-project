import router from '../../router'

export let TSS = (id) => {
    router.push({ 
        path: '/SongStart',
        query: {
            id:id
        }
    })
}