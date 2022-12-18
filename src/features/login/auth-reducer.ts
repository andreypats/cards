import { authAPI, LoginParamsType } from '../../api/cards-api'
import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkDispatch } from '../../common/hooks/useAppDispatch'
import { handleServerError } from '../../common/utils/error-handler/error-handler'

const initialState = {
  isLoggedIn: false,
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'AUTH/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'AUTH/SET-IS-LOGGED-IN', value } as const)

//thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: AppThunkDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.login(data)

    dispatch(setIsLoggedInAC(true))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerError(e, dispatch)
  }
}

export const meTC = () => async (dispatch: AppThunkDispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await authAPI.me()

    dispatch(setIsLoggedInAC(true))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerError(e, dispatch)
  }
}

//types
type ActionsTypes = ReturnType<typeof setIsLoggedInAC>
