import React from 'react'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { ConstantContent } from '@sensenet/client-core'
import { Fab } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useRepository } from '@sensenet/hooks-react'

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
  const repo = useRepository()
  const classes = useStyles()
  /**
   * Handle Uploaded File
   * @param e any
   */
  async function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    console.log(files)
    if (!e.target.files) {
      return
    }
    await repo.upload.file({
      binaryPropertyName: 'Binary',
      overwrite: true,
      parentPath: `${ConstantContent.PORTAL_ROOT.Path}/Content/IT/ImageLibrary`,
      file: e.target.files[0],
      contentTypeName: 'Image',
    })

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
