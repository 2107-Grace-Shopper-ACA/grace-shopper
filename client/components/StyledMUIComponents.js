import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'

export const StyledTextField = withStyles(() => ({
    root: {    
        "& .MuiInputBase-root": {
            color: 'whitesmoke',
        },
        "& .MuiFormLabel-root": {
            color: '#ffffff',
            marginLeft: '1rem',
        },
      },
}))(TextField);