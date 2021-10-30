import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'

export const StyledTextField = withStyles(() => ({
    root: {    
        "& .MuiInputBase-root": {
            color: 'whitesmoke',
            disableUnderline: 'true'
        },
        "& .MuiFormLabel-root": {
            color: '#ffffff',
            marginLeft: '1rem',
            disableUnderline: 'true'
        },
      },
}))(TextField);