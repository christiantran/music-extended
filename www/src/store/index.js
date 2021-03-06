import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import store from '../store'


var itunesApi = axios.create({
    baseURL: 'https://itunes.apple.com/search?media=music&term=',
    timeout: 3000
})

var myTunes = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 3000
})

vue.use(vuex)

function swapUrlSize(url, pixels) {
    var sizeString = `${pixels}x${pixels}`;
    var newURL = url.replace("60x60", sizeString);
    return newURL;
}

export default new vuex.Store({
    state: {
        // songs: [],
        // userPlaylist: [],
        //activePlaylist: {},
        //user: {}

        searchResults: [], //song objects from itunes
        userPlaylist: [] //my songs
    },

    mutations: {
        // setSongs(state, songs) {
        //     state.songs = songs
        // },
        // addSong(state, newList) {
        //     state.activePlaylist = newList
        // },
        // removeSong(state, indexToRemove) {
        //     state.userPlaylist.splice(indexToRemove, 1)
        // },
        // setPlaylist(state, lists) {
        //     state.userPlaylist = lists
        // },
        // setActivePlaylist(state, list) {
        //     state.activePlaylist = list
        // },
        // setUser(state, user) {
        //     state.user = user
        // },

        setSearchResults(state, songs){
            state.searchResults = songs
        },
        setUserPlaylist(state, songs){
            state.userPlaylist = songs
        }

    },

    actions: {
        addSong({ commit, dispatch, state }, song) {
            debugger //error here you dont have an activePlaylist
            state.activePlaylist.songs.push(song) 
            server.put('/playlist/' + state.activePlaylist._id, state.activePlaylist)
                .then(newList => {
                    commit('addSong', newList)
                })
        },

        // findSong({ commit, dispatch }, query) {
        //     itunesApi.get('search?media=music&term=' + query)
        //         .then(res => {
        //             var songList = res.data.results.map(function (song) {
        //                 return {
        //                     title: song.trackName,
        //                     albumArt: swapUrlSize(song.artworkUrl60, 275),
        //                     artist: song.artistName,
        //                     collection: song.collectionName,
        //                     price: song.collectionPrice,
        //                     preview: song.previewUrl
        //                 };
        //             })
        //             commit('setSongs', songList)
        //         })
        // },

        // removeSong({ dispatch, commit, state }, song) {
        //     var index = state.userPlaylist.findIndex(s => s.id == song.id)
        //     commit('removeSong', index)
        // },
        // addUser({ dispatch, commit }, user) {
        //     server.post('/api/create', user)
        //         .then(newUser => {
        //             commit('setUser', newUser)
        //             router.push('/home')
        //         })
        // },
        // getUser({ dispatch, commit }, user) {
        //     server.post('/api/login', user)
        //         .then(newUser => {
        //             commit('setUser', newUser)
        //         })
        //},
        // getPlaylists({ dispatch, commit, state }) {
        //     myTunes.get('/api/user-playlists/')      //+ state.user._id
        //         .then(lists => {
        //             commit('setPlaylists', lists)
        //         })
        // },
        // activePlaylist({ dispatch, commit }, list) {
        //     commit('setActivePlaylist', list)
        // }

        getSearchResults({dispatch, commit}, query){
            itunesApi.get(query)
            .then(res =>{
                var songList = res.data.results.map(song => {
                        return {
                            title: song.trackName,
                            albumArt: swapUrlSize(song.artworkUrl60, 275),
                            artist: song.artistName,
                            album: song.collectionName,
                            price: song.collectionPrice,
                            preview: song.previewUrl
                         };
            })
            commit('setSearchResults', songList)
        })
    }
    }
})