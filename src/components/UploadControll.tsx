import React from 'react'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { ConstantContent } from '@sensenet/client-core'
import { Fab } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useRepository } from '../hooks/use-repository'

interface UploadControllProps {
  uploadsetdata: () => void
  notificationControll: () => void
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
  const repo = useRepository()
  // const [open, setOpen] = React.useState(false)
  const classes = useStyles()
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
    // handleClick()

    console.log('finished')
    props.uploadsetdata()
    props.notificationControll()
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
