import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './../store/user';
import FormContaiter from './../components/FormContaiter';
import Loader from './../components/Loader';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
} from '@material-ui/core';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { apiReset, selectApiValue } from './../store/api';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import {
  createProduct,
  getProductById,
  selectAllProducts,
  updateProduct,
  productReset,
} from '../store/products';
import { EMPTY_FIELD_EXIST, IMAGE_FORMAT_INCORRECT } from '../messages';
import imgPlaceHoledr from './../assets/images/placeholder-image.png';
// import { dataURItoBlob } from '../publicFuncs';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  btn: {
    margin: theme.spacing(3, 0),
  },
  link: {
    textDecoration: 'none',
  },
  img: {
    objectFit: 'contain',
    height: '300px',
  },
}));

const ProductEditCreateScreen = ({ match }) => {
  const productId = match.params.id;
  const { loading, error, message } = useSelector(selectApiValue);
  const { userLoginInfo } = useSelector(selectUser);
  const { detail: productDetail, createSuccess } =
    useSelector(selectAllProducts);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData] = useState(new FormData());

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  // const [numReviews, setNumReviews] = useState('');

  const [imageName, setImageName] = useState('');

  const [imageErr, setImageErr] = useState('');
  const [totalErr, setTotalErr] = useState('');

  useEffect(() => {
    if (!userLoginInfo) {
      history.push('/');
    } else {
      if (createSuccess) {
        history.goBack();
      }
      if (productId) {
        dispatch(getProductById(productId));
        if (productDetail._id) {
          setName(productDetail.name);
          setPrice(productDetail.price);
          setImage(productDetail.image);
          setBrand(productDetail.brand);
          setCategory(productDetail.category);
          setCountInStock(productDetail.countInStock);
          // setNumReviews(productDetail.numReviews);
          setDescription(productDetail.description);
          setCountInStock(productDetail.countInStock);
        }
      }
    }
    // return () => {
    //   dispatch(productErrReset());
    // };
    // eslint-disable-next-line
  }, [
    dispatch,
    userLoginInfo,
    productId,
    history,
    productDetail._id,
    createSuccess,
  ]);
  useEffect(() => {
    return () => {
      dispatch(apiReset());
      dispatch(productReset());
    };
  }, [dispatch]);

  const formSubmit = () => {
    dispatch(apiReset());
    //Check for empty fields
    if (
      name &&
      price.toString() &&
      brand &&
      category &&
      countInStock.toString() &&
      description &&
      image
    ) {
      setTotalErr('');
      formData.set('name', name);
      formData.set('price', price);
      formData.set('brand', brand);
      formData.set('category', category);
      formData.set('countInStock', countInStock);
      formData.set('description', description);
      if (!formData.has('image')) {
        formData.set('image', image);
      }
      if (productId) {
        dispatch(updateProduct(productId, formData));
      } else {
        dispatch(createProduct(formData));
      }
    } else {
      setTotalErr(EMPTY_FIELD_EXIST);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageName(file.name);
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg'
    ) {
      setImage(URL.createObjectURL(file));
      formData.set('image', file);
      setImageErr('');
    } else {
      setImage('');
      setImageErr(IMAGE_FORMAT_INCORRECT);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <FormContaiter>
              <Box my={2}>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <BackIcon />
                </Button>
              </Box>
              <FormGroup>
                {error && <Alert severity='error'>{error}</Alert>}
                {message && <Alert severity='success'>{message}</Alert>}
                {totalErr && <Alert severity='error'>{totalErr}</Alert>}

                {/* {message && <Alert severity='success'>{message}</Alert>} */}
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='name'>نام محصول</InputLabel>
                  <Input
                    id='name'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary'>
                          <TagFacesIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='cat'>دسته بندی</InputLabel>
                  <Input
                    id='cat'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary'>
                          <TagFacesIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='price'>قیمت</InputLabel>
                  <Input
                    id='price'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary'>
                          <TagFacesIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='brand'>برند محصول</InputLabel>
                  <Input
                    id='brand'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary'>
                          <TagFacesIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='countInStock'>موجودی</InputLabel>
                  <Input
                    id='countInStock'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={countInStock}
                    onChange={(e) => {
                      setCountInStock(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary'>
                          <TagFacesIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='description'>توضیحات</InputLabel>
                  <Input
                    id='description'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box color='text.secondary'>
                          <TagFacesIcon />
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <input
                  type='file'
                  id='uploadImage'
                  style={{ display: 'none' }}
                  accept='image/png, image/jpg, image/jpeg'
                  onChange={handleFileChange}
                />
                {imageErr && <Alert severity='error'>{imageErr}</Alert>}
                <FormControl className={classes.input}>
                  <InputLabel htmlFor='image'>عکس</InputLabel>
                  <Input
                    id='image'
                    aria-describedby='my-helper-text'
                    type='text'
                    value={imageName}
                    disabled
                    endAdornment={
                      <InputAdornment position='start'>
                        <Box component='label' htmlFor='uploadImage' mr={-1.5}>
                          <IconButton color='primary' component='span'>
                            <AddPhotoAlternateIcon />
                          </IconButton>
                        </Box>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Card>
                  {image ? (
                    <CardMedia
                      className={classes.img}
                      component='img'
                      alt='...'
                      src={image}
                      // image={image}
                    />
                  ) : (
                    <CardMedia
                      className={classes.img}
                      component='img'
                      alt='...'
                      src={imgPlaceHoledr}
                      // image={image}
                    />
                  )}
                </Card>
                <FormControl className={classes.btn}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={formSubmit}
                  >
                    {productId ? <span>به روز رسانی</span> : <span>ثبت</span>}
                  </Button>
                </FormControl>
              </FormGroup>
            </FormContaiter>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductEditCreateScreen;
