/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from '../components/home/navbar'
export {default as UserHome} from '../components/home/user-home'
export {default as HomePage} from '../components/home/home-page'
export {default as SongMenu} from '../components/menu/song-menu'
export {
  default as SelectedSongMenu
} from '../components/menu/selected-song-menu'
export {default as Modal} from '../components/menu/Modal'
export {Login, Signup} from '../components/home/auth-form'
export {default as Webcam} from '../components/main/webcam'
export {default as Main} from '../components/main/Main'
export {default as Sing} from '../components/main/Sing'
export {default as score} from '../components/main/score'
export {default as SongSelect} from '../components/main/SongSelect'
