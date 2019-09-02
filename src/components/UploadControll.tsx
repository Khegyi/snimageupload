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
    close: {
      padding: theme.spacing(0.5),
    },
  }),
)

export const UploadControll: React.FunctionComponent<UploadControllProps> = props => {
  const repo = useRepository()
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  /**
   * Handle Uploaded File
   * @param e any
   */
  function handleClick() {
    setOpen(true)
  }
  /**
   * Handle Uploaded File
   * @param e any
   */
  function handleClose() {
    setOpen(false)
  }

  /**
   * Handle Uploaded File
   * @param e any
   */
  async function pickFile(e: any) {
    const { files } = e.target
    console.log(files)
    await repo.upload.fromFileList({
      binaryPropertyName: 'Binary',
      overwrite: true,
      createFolders: true,
      parentPath: `${ConstantContent.PORTAL_ROOT.Path}/Content/IT/ImageLibrary`,
      fileList: e.target.files,
      contentTypeName: 'Image',
    })
    handleClick()
    console.log('finished')
    props.uploadsetdata()
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Successful Upload</span>}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
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
