import React, { useEffect, useState } from 'react'
import { ConstantContent } from '@sensenet/client-core'
import { Image, User } from '@sensenet/default-content-types'
import { CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import snLogo from './assets/sensenet_logo_transparent.png'
import { useRepository } from './hooks/use-repository'
import { AdvancedGridList } from './components/AdvancedGridList'
import { SimpleAppBar } from './components/SimpleAppBar'

interface SelectedImage {
  imgIndex: number
  imgPath: string
  imgTitle: string
  imgDescription: string
  imgAuthor: string
  imgAuthorAvatar: string
  imgCreationDate: string
  imgSize: string
  imgDownloadUrl: string
}
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
  const [selectedimage, setSelectedimage] = React.useState<SelectedImage>({
    imgIndex: 0,
    imgPath: '',
    imgTitle: '',
    imgDescription: '',
    imgAuthor: '',
    imgAuthorAvatar: '',
    imgCreationDate: '',
    imgSize: '',
    imgDownloadUrl: '',
  })
  /**
   * Sets the UploadData
   */
  function setUploaddataFunction() {
    setUploaddata(true)
  }
  /**
   * Sets the Selected Image
   * @param {number} imageIndex Seletected number's index.
   */
  function getSelectedImage(imageIndex: number) {
    const selectedImage = data[imageIndex]
    const avatarUser = selectedImage.CreatedBy as User
    const avatarUserAvatarUrl = avatarUser.Avatar ? avatarUser.Avatar.Url : ''

    setSelectedimage({
      imgIndex: imageIndex,
      imgPath: repo.configuration.repositoryUrl + selectedImage.Path,
      imgTitle: selectedImage.DisplayName ? selectedImage.DisplayName : '',
      imgDescription: selectedImage.Description ? selectedImage.Description : '',
      imgAuthor: selectedImage.CreatedBy ? ((selectedImage.CreatedBy as User).FullName as string) : '',
      imgAuthorAvatar: avatarUserAvatarUrl as string,
      imgCreationDate: moment(new Date(selectedImage.CreationDate ? selectedImage.CreationDate : '')).format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      imgSize: `${(selectedImage.Size ? selectedImage.Size / 1024 / 1024 : 0).toFixed(2)} MB`,
      imgDownloadUrl: selectedImage.Binary
        ? repo.configuration.repositoryUrl + selectedImage.Binary.__mediaresource.media_src
        : '',
    })
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
  }, [uploaddata])

  /**
   *  Close the Details View.
   */
  useEffect(() => {
    /**
     * Fetches the images from the repository.
     */
    loadImages()
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
      <AdvancedGridList openFunction={getSelectedImage} imgList={data} />
    </div>
  )
}
