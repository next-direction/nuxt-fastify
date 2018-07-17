import {
    resolve
} from "url";

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
    ],
    test: 0
})

export const getters = {
    people(state) {
        return state.people
    }
}

export const actions = {
    nuxtServerInit(context, test) {
        return new Promise((resolve, reject) => {
            context.commit('test', test);
            resolve();
        });

    }
}

export const mutations = {
    test(state, test) {
        state.test = test
    }
}
