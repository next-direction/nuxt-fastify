export const state = () => ({
    people: [{
            id: 1,
            name: 'Hans'
        },
        {
            id: 2,
            name: 'Peter'
        },
        {
            id: 3,
            name: 'Schorsch'
        },
        {
            id: 4,
            name: 'Martin'
        },
        {
            id: 5,
            name: 'Robert'
        }
    ]
})

export const getters = {
    people(state) {
        return state.people
    }
}

export const actions = {

}

export const mutations = {

}
