/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { aveRating } from 'Utilities';
import ReviewList from './Reviews/ReviewList';
import WriteReview from './WriteReview/WriteReview';
import Breakdown from './Breakdown/Breakdown';
import ProductContext from '../Context';
import {
  LeftContainer,
  RightContainer,
  StyledButton,
  StyledMain,
  StyledSelect,
} from './Style/RatingReviewStyle';

function RatingReviews() {
  const { productId, avgRating, setAvgRating } = useContext(ProductContext);
  const [sortView, setSortView] = useState('relevant');
  const [sortedList, setSortedList] = useState(null);
  const [sortStarFilter, setSortStarFilter] = useState(0);
  const [pageUrl, setPageUrl] = useState(1);
  const [countUrl, setCountUrl] = useState(100);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [metaData, setMetaData] = useState(null);
  const fetchDataRR = () => {
    const reviewAPI = `reviews/1`;
    const metaDataAPI = `reviews/1/meta`;

    const getReviewAPI = axios.get(reviewAPI);
    const getMetaDataAPI = axios.get(metaDataAPI);

    axios
      .all([getReviewAPI, getMetaDataAPI])
      .then(
        axios.spread((...allData) => {
          console.log('reviews', allData[0].data, '\n metadata', allData[1].data);
          setSortedList(allData[0].data.results), setMetaData(allData[1].data);
          setAvgRating(aveRating(allData[0].data.results));
        })
      )
      .catch((err) => {
        console.log('err in RR GET', err);
      });
  };

  useEffect(() => {
    fetchDataRR();
  }, [sortView, countUrl, productId]);

  const handleViewChange = (event) => {
    setSortView(event.target.value);
  };

  const handleViewClick = (event) => {
    event.preventDefault();
  };

  const handleStarReviewClick = (event) => {
    setSortStarFilter(event);
  };

  return (
    <StyledMain>
      <h2>Rating And Reviews</h2>
      <LeftContainer>
        <div className='RR-breakdown'>
          {metaData && (
            <Breakdown metaData={metaData} handleStarReviewClick={handleStarReviewClick} />
          )}
        </div>
      </LeftContainer>

      <RightContainer>
        <div className='RR-reviews'>
          <form onClick={handleViewClick}>
            <label>
              <StyledSelect value={sortView} onChange={handleViewChange}>
                <option value='relevant'>Relevant</option>
                <option value='newest'>Newest</option>
                <option value='helpful'>Helpful</option>
              </StyledSelect>
            </label>
          </form>
          {sortedList && <ReviewList sortedList={sortedList} sortStarFilter={sortStarFilter} />}
        </div>

        <div className='RR-write-review'>
          <StyledButton onClick={() => setShowWriteReview(true)}>Write Review</StyledButton>
          {metaData && (
            <WriteReview
              showWriteReview={showWriteReview}
              setShowWriteReview={setShowWriteReview}
              productId={productId}
              metaData={metaData}
            />
          )}
        </div>
      </RightContainer>
    </StyledMain>
  );
}

export default RatingReviews;
