import React from 'react'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { ConstantContent } from '@sensenet/client-core'
import { Fab, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useRepository } from '../hooks/use-repository'

interface UploadControllProps {
  uploadsetdata: () => void
  notificationControll: (onoff: boolean) => void
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      position: 'fixed',
      zIndex: 1,
    },
    input: {
      display: 'none',
    },
    button: {
      margin: theme.spacing(1),
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    appBar: {
      width: '100%',
      marginRight: '0',
    },
  }),
)

export const UploadControll: React.FunctionComponent<UploadControllProps> = props => {
  const [open, setOpen] = React.useState(false)
  const repo = useRepository()
  const classes = useStyles()
  /**
   * Opens the Snackbar for succesfull upload
   */
  function handleClick() {
    setOpen(true)
  }
  /**
   * Closes the Snackbar
   * @param e any
   */
  function handleClose(_event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  /**
   * Handle Uploaded File
   * @param e any
   */
  async function pickFile(e: any) {
    await repo.upload.fromFileList({
      binaryPropertyName: 'Binary',
      overwrite: true,
      parentPath: `${ConstantContent.PORTAL_ROOT.Path}/Content/IT/ImageLibrary`,
      file: e.target.files[0],
      contentTypeName: 'Image',
    })
    handleClick()
    props.uploadsetdata()
    props.notificationControll(true)
  }

  return (
    <div>
      <input
        accept="image/*"
        onChange={e => pickFile(e)}
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Fab variant="extended" title="Upload" component="span" className={classes.button}>
          <CloudUpload />
        </Fab>
      </label>
    </div>
  )
}
