import React, { useEffect, useState } from 'react'
import { ConstantContent } from '@sensenet/client-core'
import { Image } from '@sensenet/default-content-types'
import { CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import snLogo from './assets/sensenet_logo_transparent.png'
import { useRepository } from './hooks/use-repository'
import { AdvancedGridList } from './components/AdvancedGridList'
import { SimpleAppBar } from './components/SimpleAppBar'

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'unset',
    overflow: 'visible',
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))
/**
 * The main entry point of your app. You can start h@cking from here ;)
 */
export const App: React.FunctionComponent = () => {
  const repo = useRepository()
  const [data, setData] = useState<Image[]>([])
  const [uploaddata, setUploaddata] = useState<boolean>(false)
  /**
   * Sets the UploadData
   */
  function setUploaddataFunction() {
    setUploaddata(true)
  }
  /**
   *  Close the Details View.
   */
  async function loadImages(): Promise<void> {
    const result = await repo.loadCollection<Image>({
      path: `${ConstantContent.PORTAL_ROOT.Path}/Content/IT/ImageLibrary`,
      oDataOptions: {
        select: [
          'Binary',
          'DisplayName',
          'Description',
          'CreationDate',
          'CreatedBy',
          'Height',
          'ModificationDate',
          'Size',
          'Width',
        ],
        expand: ['CreatedBy'],
      },
    })
    setData(result.d.results)
  }
  /**
   *  Close the Details View.
   */
  useEffect(() => {
    /**
     * Fetches the images from the repository.
     */
    console.log(uploaddata)
    if (uploaddata) {
      loadImages()
      setUploaddata(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploaddata])

  /**
   *  Close the Details View.
   */
  useEffect(() => {
    /**
     * Fetches the images from the repository.
     */
    loadImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo])
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${snLogo})`,
        backgroundSize: 'auto',
      }}>
      <CssBaseline />
      <SimpleAppBar uploadsetdata={setUploaddataFunction} />
      <AdvancedGridList imgList={data} />
    </div>
  )
}
