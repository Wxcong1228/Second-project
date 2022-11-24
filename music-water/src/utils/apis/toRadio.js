
import router from '../../router'

export let TR = (id) => {
    router.push({ 
        path: '/radioStation',
        query:{
            id:id
        }
    })
}