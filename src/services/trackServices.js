import Axios from './customAxios'

const getTrackList = async (minDiff, maxDiff) => {
  return await Axios.get(`api/tracks/select?minDiff=${minDiff}&maxDiff=${maxDiff}`)
}

export { getTrackList }