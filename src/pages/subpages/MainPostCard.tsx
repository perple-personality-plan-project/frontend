import React, { useState } from 'react';
import styled from 'styled-components';
import { MainModal } from '../../components/modal/MainModal';
import MainModalSlider from '../../components/MainModalSlider';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  post: {
    feed_id: number;
    thumbnail: string;
    description: string;
    like_count: number;
    mbti: string;
    created_at: string;
    updated_at: string;
  };
}

interface commentPreset {
  id: number;
  content: string;
}

const MainPostCard: React.FC<Props> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [comments, setComments] = useState<commentPreset[]>([]);
  const [content, setContent] = useState('');

  const [dataSource, setDataSource] = useState(Array.from({ length: 4 }));
  const [hasMore, setHasMore] = useState(true);

  const addHandler = () => {
    const newComment = {
      id: comments.length + 1,
      content: content,
    };
    if (content === '') {
      return;
    }
    setComments([...comments, newComment]);
    setContent('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setDataSource(dataSource.concat(Array.from({ length: 2 })));
    }, 1000);
  };
  console.log(post.thumbnail);
  const splited = post.thumbnail.split(',');
  console.log(splited);
  return (
    <StGroupPost key={post.feed_id}>
      <div className="post-container" onClick={() => setIsOpen(true)}>
        <div className="post-header">
          <div className="post-header-info">
            <img
              style={{ width: '40px', height: '40px' }}
              src={require('../../빡빡이1.png')}
              alt="group-img"
            />
            {/* <h3>{post.locationName}</h3> */}
            <p>{post.mbti}</p>
          </div>
          {/* <div className="post-header-route">{post.locationRoute}</div> */}
          <div className="post-header-route">왕십리</div>
        </div>
        <img
          className="post-img-size"
          src={process.env.REACT_APP_IMG_API + splited[0]}
          alt="group-img"
        />
        <div className="post-desc">
          <p>{post.description}</p>
          <div className="post-bottom">
            <p className="post-date">2022.12.29</p>
            <div className="post-bottom-right">
              <div className="post-bottom-icon">A</div>
              <div className="post-bottom-icon">B</div>
              <div className="post-bottom-icon">C</div>
            </div>
          </div>
        </div>
      </div>

      <MainModal
        onClose={() => setIsOpen(false)}
        open={isOpen}
        id={post.feed_id}
      >
        <StXIcon onClick={() => setIsOpen(false)}>X</StXIcon>
        <Arrow>
          <div className="button-prev" />
          <StDetailContainer>
            <MainModalSlider id={post.feed_id} imageData={splited} />
            <StDetailInfo>
              <StDetailDesc>
                <img src={require('../../빡빡이1.png')} alt="detail-img" />
                <div className="detail-info">
                  <div className="detail-top" style={{ display: 'flex' }}>
                    {/* <h2>{post.locationName}</h2> */}
                    <h2>왕십리</h2>
                    <p>{post.mbti}</p>
                  </div>
                  <p>{post.description}</p>
                  <div className="detail-bottom">
                    <p>2022.12.29</p>
                    <div style={{ display: 'flex' }}>
                      <div className="detail-btn">좋</div>
                      <div className="detail-btn">댓</div>
                      <div className="detail-btn">공유</div>
                    </div>
                  </div>
                </div>
              </StDetailDesc>
              <StDetailBorder></StDetailBorder>
              <StDetailComments>
                <StDetailComment>
                  <InfiniteScroll
                    dataLength={dataSource.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<p></p>}
                    style={{ overflow: 'auto', height: '100%' }}
                  >
                    {comments.map(comment => {
                      return (
                        <StDetailDesc key={comment.id}>
                          <img
                            src={require('../../빡빡이1.png')}
                            alt="detail-img"
                          />
                          <div className="detail-info">
                            <div
                              className="detail-top"
                              style={{ display: 'flex' }}
                            >
                              {/* <h2>{post.locationName}</h2> */}
                              {/* <p>{post.postTag}</p> */}
                            </div>
                            <p>{comment.content}</p>
                            <div className="comment-bottom">
                              <p>댓글</p>
                              <div style={{ display: 'flex' }}>
                                <div className="commentDel-btn">삭</div>
                              </div>
                            </div>
                          </div>
                        </StDetailDesc>
                      );
                    })}
                  </InfiniteScroll>
                </StDetailComment>
              </StDetailComments>
              <StDetailInput>
                <input value={content} onChange={onChange} />
                <button className="input-btn" onClick={addHandler}>
                  완료
                </button>
              </StDetailInput>
            </StDetailInfo>
          </StDetailContainer>
          <div className="button-after" />
        </Arrow>
      </MainModal>
    </StGroupPost>
  );
};

export default MainPostCard;

const StGroupPost = styled.div`
  .post-container {
    position: relative;
    width: 400px;

    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    /* overflow: hidden; */
    cursor: pointer;

    img {
      width: 100%;
      background-color: #f0f0f0;
    }

    .post-header {
      background-color: whitesmoke;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* position: absolute; */
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 10px;

      .post-header-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          background-color: gray;
          border-radius: 50%;
          margin-right: 10px;
        }

        h3 {
          margin: 0;
          font-size: 15px;
          margin-right: 10px;
        }

        p {
          background-color: white;
          border-radius: 20px;
          font-size: 12px;
          padding: 5px 15px;
        }
      }

      .post-header-route {
        background-color: white;
        border-radius: 5px;
        color: #5b5b5b;
        font-size: 12px;
        font-weight: bold;
        padding: 10px 15px;
        /* margin-right: 20px; */
      }
    }

    .post-desc {
      margin: 15px;
      p {
        max-width: 25ch;
        margin: 0 0 40px 0;
        overflow: auto;
      }

      .post-date {
        font-size: 14px;
        color: #9e9e9e;
        margin: 0;
      }
    }

    .post-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .post-bottom-right {
      display: flex;

      .post-bottom-icon {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: pink;

        /* border-radius: 50%; */
        margin: 0 5px;
      }
    }

    @media screen and (max-width: 900px) {
      width: 400px;
    }
  }

  .post-img-size {
    width: 350px;
    height: 350px;
  }
`;

const Arrow = styled.div`
  display: flex;
  flex-direction: row;
  .button-prev:after {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin-top: 18rem;
    border-top: 0.2rem solid white;
    border-right: 0.2rem solid white;
    -webkit-transform: rotate(225deg);
    -ms-transform: rotate(225deg);
    transform: rotate(225deg);
  }
  .button-after:after {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin-top: 18rem;
    border-top: 0.2rem solid white;
    border-right: 0.2rem solid white;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const StXIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;

  position: absolute;
  top: -35px;
  right: -2px;
  cursor: pointer;
`;

const StDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;

  img {
    /* max-width: 600px; */
    width: 100%;
    height: 100%;
    /* border-radius: 20px 0 0 20px; */
    background-color: #b6b6b6;
  }

  @media screen and (max-width: 1024px) {
    /* aspect-ratio: 1/1; */
    width: 400px;
    /* height: 100%; */
    flex-direction: column;
    margin: 0 auto;

    img {
      width: 350px;
      height: 350px;
    }
  }
`;

const StDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 70%;
  background-color: #f0f0f0;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const StDetailDesc = styled.div`
  box-sizing: border-box;
  padding: 20px 20px 20px 10px;
  display: flex;
  img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .detail-info {
    display: flex;
    flex-direction: column;

    p {
      margin: 0;
    }
  }

  .detail-top {
    display: flex;
    align-items: center;
    margin: 0 0 10px 0;
    font-size: 15px;
    h2 {
      font-size: 15px;
      margin: 0 10px 0 0;
    }

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      width: 60px;
      height: 20px;
      background-color: white;
    }
  }
  .commentDel-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background-color: #d9d9d9;
    color: black;
    margin-left: 8rem;
    font-size: 10px;
  }
  .comment-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 12px;
  }
  .detail-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 12px;
  }
  .detail-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #d9d9d9;
    color: black;
    margin-left: 10px;
    font-size: 10px;
  }
`;

const StDetailBorder = styled.div`
  border-bottom: 1px solid #b6b6b6;
  margin-top: 10px;
`;

const StDetailComments = styled.div`
  aspect-ratio: 1/1.2;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px 10px 20px 10px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 200px;
  }
`;

const StDetailComment = styled.div`
  display: flex;
  margin-bottom: 15px;
  img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .detail-info {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      margin: 0;
      /* width: 20ch; */
    }

    .detail-top {
      display: flex;
      /* justify-content: center; */
      align-items: center;
      margin: 0 0 10px 0;
      font-size: 15px;
      h2 {
        font-size: 15px;
        margin: 0 10px 0 0;
      }

      p {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        width: 60px;
        height: 20px;
        background-color: white;
      }
    }
  }
`;

const StDetailInput = styled.div`
  background-color: #f2f2f2;
  border-top: 1px solid #b6b6b6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin: auto 0;

  input {
    border: 1px solid gray;
    border-radius: 20px;
    text-indent: 10px;
    width: 85%;
    height: 30px;
  }

  .input-btn {
    width: 30px;
    height: 30px;
    font-size: 10px;
    margin-left: 5px;
  }
`;
