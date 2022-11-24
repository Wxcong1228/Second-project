import router from '../../router'

export let TC = (arr) => {
    router.push({ 
        path: '/comment',
        query: {
            arr:arr
        }
    })
}