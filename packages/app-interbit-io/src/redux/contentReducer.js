import content from '../content'

export const initialState = {
  ...content
}

export const reducer = (state = initialState, action) => state
